"use server";

import prisma from "@/prisma";
import { requireAuth } from "@/lib/utils/auth";
import { endOfDay, startOfDay, subDays } from "date-fns";

export const checkUserStreak = async (): Promise<
  { streakBroken: boolean } | undefined
> => {
  try {
    const userId = await requireAuth();

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

    // get all past task dates before today
    const pastTaskDates = await prisma.dailyTask.findMany({
      where: {
        userId,
        date: {
          lt: today,
        },
      },
      select: { date: true },
      distinct: ["date"],
      orderBy: { date: "desc" },
    });

    // no previous tasks, just update lastActiveDate
    if (!pastTaskDates.length) {
      await prisma.user.update({
        where: { id: userId },
        data: { lastActiveDate: today },
      });
      return;
    }

    const mostRecentDay = pastTaskDates[0].date;

    // fetch all tasks of recent most day
    const tasks = await prisma.dailyTask.findMany({
      where: { userId, date: mostRecentDay },
      include: { completions: true },
    });

    // check if any task was missed
    const missed = tasks.some((task) => task.completions.length === 0);

    // if missed tasks, reset streak and set flag in localstorage
    if (missed && user.currentStreak > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          currentStreak: 0,
          lastActiveDate: today,
        },
      });

      return { streakBroken: true };
    }

    // if no missed tasks, update streak if last active date was yesterday
    if (user.lastActiveDate) {
      const lastActive = startOfDay(new Date(user.lastActiveDate));
      const isConsecutive = lastActive.getTime() === yesterday.getTime();

      const newStreak = isConsecutive ? user.currentStreak + 1 : 1;
      const longestStreak = Math.max(user.longestStreak, newStreak);

      await prisma.user.update({
        where: { id: userId },
        data: {
          currentStreak: newStreak,
          longestStreak,
          lastActiveDate: today,
        },
      });
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: { currentStreak: 1, longestStreak: 1, lastActiveDate: today },
      });
    }

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

    const start = startOfDay(new Date());
    const end = endOfDay(new Date());

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

    console.log(todayTasks, allCompleted);

    if (!allCompleted) {
      return { success: false, message: "not all tasks completed" };
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { success: false, message: "user not found" };

    const newCurrentStreak = user.currentStreak + 1;
    const newLongestStreak = Math.max(user.longestStreak, newCurrentStreak);

    await prisma.user.update({
      where: { id: userId },
      data: {
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        lastActiveDate: today,
      },
    });

    return { success: true, newStreak: newCurrentStreak };
  } catch (error) {
    console.error("error completing day:", error);
    return { success: false, message: "failed to complete day" };
  }
};
