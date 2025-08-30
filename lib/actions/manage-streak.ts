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

    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: {
          currentStreak: true,
          lastActiveDate: true,
          streakBrokenToday: true,
          dailyTasks: {
            where: {
              date: {
                gte: yesterday,
                lt: today, // only yesterday
              },
            },
            include: {
              completions: true,
            },
          },
        },
      });

      if (!user) {
        console.log("User not found");
        return { streakBroken: false };
      }

      // If already marked as broken today, redirect
      if (user.streakBrokenToday) {
        console.log("Streak already broken today");
        return { streakBroken: true };
      }

      // Get only yesterday's tasks (we already filtered in DB)
      const yesterdayTasks = user.dailyTasks;

      if (yesterdayTasks.length === 0) {
        console.log("No tasks assigned yesterday → streak NOT broken");
        // Still update last active date
        await tx.user.update({
          where: { id: userId },
          data: { lastActiveDate: today, streakBrokenToday: false },
        });
        return { streakBroken: false };
      }

      // Check for any incomplete task yesterday
      const anyIncomplete = yesterdayTasks.some((task) => {
        const completedToday = task.completions.some((c) =>
          isSameDay(new Date(c.completedAt), yesterday)
        );
        return !completedToday;
      });

      if (anyIncomplete) {
        console.log("MISSING TASK YESTERDAY → STREAK BROKEN");

        await tx.user.update({
          where: { id: userId },
          data: {
            currentStreak: 0,
            lastActiveDate: today,
            lastStreakBreakDate: yesterday,
            streakBrokenToday: true,
          },
        });

        return { streakBroken: true };
      }

      // All tasks completed → streak continues
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
    return { streakBroken: true }; 
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
