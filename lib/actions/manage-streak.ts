"use server";

import prisma from "@/prisma";
import { requireAuth } from "@/lib/utils/auth";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { revalidatePath } from "next/cache";

export const spawnDailyTasksIfMissing = async () => {
  const userId = await requireAuth();
  const today = startOfDay(new Date());

  const existingCount = await prisma.dailyTask.count({
    where: { userId, date: today },
  });

  if (existingCount > 0) {
    return { spawned: false, existing: existingCount };
  }

  const userChallenge = await prisma.userChallenge.findFirst({
    where: { userId, completed: false },
    include: {
      challenge: {
        include: {
          tasks: { include: { task: true } },
        },
      },
    },
  });

  if (!userChallenge) {
    return { spawned: false, reason: "No active challenge" };
  }

  const todayTasks = userChallenge.challenge.tasks.map((ct) => ({
    userId,
    taskId: ct.task.id,
    date: today,
  }));

  if (todayTasks.length === 0) {
    return { spawned: false, reason: "No tasks in challenge" };
  }

  await prisma.dailyTask.createMany({
    data: todayTasks,
    skipDuplicates: true,
  });

  console.log("SPAWNED DAILY TASKS FOR USER IN CHECK USER STREAK CALL AHHHH");

  return { spawned: true, count: todayTasks.length };
};

export const checkUserStreak = async (): Promise<{ streakBroken: boolean }> => {
  try {
    const userId = await requireAuth();
    const today = startOfDay(new Date());
    const yesterday = startOfDay(subDays(today, 1));

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        currentStreak: true,
        longestStreak: true,
        lastActiveDate: true,
        streakBrokenToday: true,
      },
    });

    if (!user) return { streakBroken: false };

    // Fetch past task dates excluding today
    const pastTaskDates = await prisma.dailyTask.findMany({
      where: { userId, date: { lt: today } },
      select: { date: true },
      distinct: ["date"],
      orderBy: { date: "desc" },
    });

    // First day scenario
    if (!pastTaskDates.length) {
      await prisma.user.update({
        where: { id: userId },
        data: { lastActiveDate: today, streakBrokenToday: false },
      });
      return { streakBroken: false };
    }

    const mostRecentDay = pastTaskDates[0].date;
    const mostRecentTasks = await prisma.dailyTask.findMany({
      where: { userId, date: mostRecentDay },
      include: { completions: true },
    });

    const hasMissedTasks = mostRecentTasks.some(
      (task) => task.completions.length === 0
    );

    if (hasMissedTasks && user.currentStreak > 0) {
      // break the streak
      await prisma.user.update({
        where: { id: userId },
        data: {
          currentStreak: 0,
          lastActiveDate: today,
          streakBrokenToday: true,
        },
      });
      return { streakBroken: true };
    }

    // Update streak if no missed tasks
    const lastActive = user.lastActiveDate
      ? startOfDay(new Date(user.lastActiveDate))
      : undefined;
    const isConsecutiveDay = lastActive?.getTime() === yesterday.getTime();
    const newStreak = isConsecutiveDay ? user.currentStreak + 1 : 1;
    const newLongestStreak = Math.max(user.longestStreak, newStreak);

    await prisma.user.update({
      where: { id: userId },
      data: {
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastActiveDate: today,
        streakBrokenToday: false,
      },
    });

    return { streakBroken: false };
  } catch (error) {
    console.error("Error checking user streak:", error);
    return { streakBroken: false };
  }
};

export const completeDayAndUpdateStreak = async () => {
  try {
    const userId = await requireAuth();
    const today = startOfDay(new Date());

    const todayTasks = await prisma.dailyTask.findMany({
      where: { userId, date: { gte: today, lte: endOfDay(today) } },
      include: { completions: true },
    });

    const allCompleted =
      todayTasks.length > 0 &&
      todayTasks.every((t) => t.completions.length > 0);

    if (!allCompleted) {
      return { success: false, message: "not all tasks completed" };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { currentStreak: true, longestStreak: true },
    });

    if (!user) {
      return { success: false, message: "user not found" };
    }

    const newCurrentStreak = user.currentStreak + 1;
    const newLongestStreak = Math.max(user.longestStreak, newCurrentStreak);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        lastActiveDate: today,
      },
    });

    revalidatePath("/dashboard");

    return { success: true, newStreak: updatedUser.currentStreak };
  } catch (error) {
    console.error("error completing day:", error);
    return {
      success: false,
      message: "failed to complete day",
      error: error.message,
    };
  }
};

// SOLUTION 2: Alternative using a transaction for atomicity
export const completeDayAndUpdateStreakTransaction = async () => {
  try {
    const userId = await requireAuth();
    const today = startOfDay(new Date());

    const result = await prisma.$transaction(async (tx) => {
      const todayTasks = await tx.dailyTask.findMany({
        where: { userId, date: { gte: today, lte: endOfDay(today) } },
        include: { completions: true },
      });

      const allCompleted =
        todayTasks.length > 0 &&
        todayTasks.every((t) => t.completions.length > 0);

      if (!allCompleted) {
        throw new Error("not all tasks completed");
      }

      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { currentStreak: true, longestStreak: true },
      });

      if (!user) {
        throw new Error("user not found");
      }

      const newCurrentStreak = user.currentStreak + 1;
      const newLongestStreak = Math.max(user.longestStreak, newCurrentStreak);

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          currentStreak: newCurrentStreak,
          longestStreak: newLongestStreak,
          lastActiveDate: today,
        },
      });

      return updatedUser;
    });

    revalidatePath("/dashboard");

    return { success: true, newStreak: result.currentStreak };
  } catch (error) {
    console.error("error completing day:", error);
    return {
      success: false,
      message: error.message || "failed to complete day",
      error: error.message,
    };
  }
};
