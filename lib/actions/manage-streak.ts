"use server";

import prisma from "@/prisma";
import { requireAuth } from "@/lib/utils/auth";
import { endOfDay, isSameDay, startOfDay, subDays } from "date-fns";
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
  console.log("Checking user streak...");
  try {
    const userId = await requireAuth();
    const today = startOfDay(new Date());
    const yesterday = startOfDay(subDays(today, 1));

    // Use a transaction to ensure data consistency
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: {
          currentStreak: true,
          longestStreak: true,
          lastActiveDate: true,
          streakBrokenToday: true,
          lastStreakBreakDate: true,
          dailyTasks: {
            include: {
              completions: true,
            },
          },
        },
      });

      console.log("User found:", user);

      if (!user) return { streakBroken: false };

      // If streak already broken today, return early
      if (user.streakBrokenToday) {
        console.log("Streak already broken today, skipping checks");
        return { streakBroken: true };
      }

      // Only check yesterday for streak breaking (not all historical dates)
      const yesterdayTasks = user.dailyTasks.filter((task) =>
        isSameDay(new Date(task.date), yesterday)
      );

      // If no tasks were assigned yesterday, don't break streak
      if (yesterdayTasks.length === 0) {
        console.log("No tasks assigned for yesterday, streak continues");
        await tx.user.update({
          where: { id: userId },
          data: {
            lastActiveDate: today,
            streakBrokenToday: false,
          },
        });
        return { streakBroken: false };
      }

      // Check if any yesterday tasks were incomplete
      const incompleteTasks = yesterdayTasks.filter((task) => {
        return (
          task.completions.length === 0 ||
          task.completions.every(
            (completion) =>
              !isSameDay(new Date(completion.completedAt), yesterday)
          )
        );
      });

      console.log({
        yesterdayTasks: yesterdayTasks.length,
        incompleteTasks: incompleteTasks.length,
      });

      // If all yesterday tasks were completed, streak continues
      if (incompleteTasks.length === 0) {
        await tx.user.update({
          where: { id: userId },
          data: {
            lastActiveDate: today,
            streakBrokenToday: false,
          },
        });
        return { streakBroken: false };
      }

      // Break the streak only if user has a current streak and missed yesterday
      if (user.currentStreak > 0) {
        console.log("Breaking streak - missed tasks yesterday");
        await tx.user.update({
          where: { id: userId },
          data: {
            currentStreak: 0,
            lastActiveDate: today,
            lastStreakBreakDate: yesterday, // Use yesterday, not the missedDay
            streakBrokenToday: true,
          },
        });
        return { streakBroken: true };
      }

      // If no current streak, just update last active date
      await tx.user.update({
        where: { id: userId },
        data: {
          lastActiveDate: today,
          streakBrokenToday: false,
        },
      });

      return { streakBroken: false };
    });
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
