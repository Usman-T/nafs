"use server";

import prisma from "@/prisma";
import { requireAuth } from "@/lib/utils/auth";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { revalidatePath } from "next/cache";

export const spawnDailyTasksIfMissing = async () => {
  const userId = await requireAuth();
  const today = startOfDay(new Date());

  // Check if tasks already exist today
  const existing = await prisma.dailyTask.findFirst({
    where: { userId, date: today },
  });
  if (existing) return { spawned: false };

  // Fetch user's current challenge
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
  if (!userChallenge) return { spawned: false };

  // Map over correct `tasks` field
  const todayTasks = userChallenge.challenge.tasks.map((ct) => ({
    userId,
    taskId: ct.task.id,
    date: today,
  }));

  await prisma.dailyTask.createMany({ data: todayTasks, skipDuplicates: true });

  return { spawned: true, count: todayTasks.length };
};

export const checkUserStreak = async (): Promise<
  { streakBroken: boolean } | undefined
> => {
  try {
    const userId = await requireAuth();

    // Ensure tasks exist for today
    const spawnedResult = await spawnDailyTasksIfMissing();
    if (spawnedResult.spawned)
      console.log("Spawned tasks for today:", spawnedResult.count);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        lastActiveDate: true,
        currentStreak: true,
        longestStreak: true,
      },
    });
    if (!user) return;

    const today = startOfDay(new Date());
    const yesterday = startOfDay(subDays(today, 1));

    const pastTaskDates = await prisma.dailyTask.findMany({
      where: { userId, date: { lt: today } },
      select: { date: true },
      distinct: ["date"],
      orderBy: { date: "desc" },
    });

    if (!pastTaskDates.length) {
      await prisma.user.update({
        where: { id: userId },
        data: { lastActiveDate: today },
      });
      return { streakBroken: false };
    }

    const mostRecentDay = pastTaskDates[0].date;
    const tasks = await prisma.dailyTask.findMany({
      where: { userId, date: mostRecentDay },
      include: { completions: true },
    });

    const missed = tasks.some((t) => t.completions.length === 0);
    if (missed && user.currentStreak > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: { currentStreak: 0, lastActiveDate: today },
      });
      return { streakBroken: true };
    }

    // Update streak
    const lastActive = user.lastActiveDate
      ? startOfDay(new Date(user.lastActiveDate))
      : undefined;
    const isConsecutive = lastActive?.getTime() === yesterday.getTime();
    const newStreak = isConsecutive ? user.currentStreak + 1 : 1;
    const newLongestStreak = Math.max(user.longestStreak, newStreak);

    await prisma.user.update({
      where: { id: userId },
      data: {
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastActiveDate: today,
      },
    });

    return { streakBroken: false };
  } catch (error) {
    console.error("error checking user streak:", error);
    return { streakBroken: false };
  }
};

export const completeDayAndUpdateStreak = async () => {
  try {
    const userId = await requireAuth();
    const today = startOfDay(new Date());
    const start = today;
    const end = endOfDay(today);

    // Fetch today's tasks including completions
    const todayTasks = await prisma.dailyTask.findMany({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
      },
      include: { completions: true },
    });

    const allCompleted =
      todayTasks.length > 0 &&
      todayTasks.every((task) => task.completions.length > 0);

    if (!allCompleted) {
      return { success: false, message: "not all tasks completed" };
    }

    // Atomically increment currentStreak
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        currentStreak: { increment: 1 },
        lastActiveDate: today,
      },
    });

    // Update longestStreak if needed
    const newLongestStreak = Math.max(
      updatedUser.longestStreak,
      updatedUser.currentStreak + 1
    );

    await prisma.user.update({
      where: { id: userId },
      data: { longestStreak: newLongestStreak },
    });

    // Revalidate dashboard so new streak shows up immediately
    revalidatePath("/dashboard");

    return { success: true, newStreak: updatedUser.currentStreak + 1 };
  } catch (error) {
    console.error("error completing day:", error);
    return { success: false, message: "failed to complete day" };
  }
};