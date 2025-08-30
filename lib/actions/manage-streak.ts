"use server";

import prisma from "@/prisma";
import { requireAuth } from "@/lib/utils/auth";
import { endOfDay, isSameDay, startOfDay, subDays } from "date-fns";
import { revalidatePath } from "next/cache";

export const spawnDailyTasksIfMissing = async () => {
  const userId = await requireAuth();
  const today = startOfDay(new Date());

  await prisma.user.update({
    where: { id: userId },
    data: { streakBrokenToday: false },
  });

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

  console.log("SPAWNED DAILY TASKS AND RESET streakBrokenToday = false");

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
          lastStreakBreakDate: true,
          dailyTasks: {
            where: {
              date: {
                gte: yesterday,
                lt: today,
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

      if (user.streakBrokenToday) {
        console.log("Streak already broken today → redirect to /streak-break");
        return { streakBroken: true };
      }

      console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
      console.log({ lastStreakBreak: user.lastStreakBreakDate, today });
      if (
        user.lastStreakBreakDate &&
        isSameDay(user.lastStreakBreakDate, today)
      ) {
        console.log("User already broke streak today → no streak check needed");
        return { streakBroken: false };
      }

      const yesterdayTasks = user.dailyTasks;

      if (yesterdayTasks.length === 0) {
        console.log("No tasks assigned yesterday → streak continues");
        await tx.user.update({
          where: { id: userId },
          data: { lastActiveDate: today },
        });
        return { streakBroken: false };
      }

      const anyIncomplete = yesterdayTasks.some((task) => {
        const completedYesterday = task.completions.some((c) =>
          isSameDay(new Date(c.completedAt), yesterday)
        );
        return !completedYesterday;
      });

      if (anyIncomplete) {
        console.log("MISSING TASK YESTERDAY → STREAK BROKEN");

        await tx.user.update({
          where: { id: userId },
          data: {
            currentStreak: 0,
            lastActiveDate: today,
            lastStreakBreakDate: today,
            streakBrokenToday: true,
          },
        });

        return { streakBroken: true };
      }

      await tx.user.update({
        where: { id: userId },
        data: {
          lastActiveDate: today,
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
    console.error("Error completing day:", error);
    return {
      success: false,
      message: "Failed to complete day",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
