"use server";

import prisma from "@/prisma";
import { requireAuth } from "@/lib/auth";
import { startOfDay, subDays, isSameDay } from "date-fns";

export const updateUserStreak = async () => {
  try {
    const userId = await requireAuth();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        lastActiveDate: true,
        currentStreak: true,
        longestStreak: true,
        challengeId: true,
      },
    });

    if (!user) return null;

    const today = startOfDay(new Date());
    const yesterday = startOfDay(subDays(today, 1));

    if (user.lastActiveDate && isSameDay(user.lastActiveDate, today)) {
      return user.currentStreak;
    }

    const todayTasks = await prisma.dailyTask.findMany({
      where: {
        userId,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
      include: {
        completions: {
          where: {
            completedAt: {
              gte: today,
              lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
            },
          },
        },
      },
    });

    console.log(todayTasks);
    const allTasksCompleted =
      todayTasks.length > 0 &&
      todayTasks.every((task) => task.completions.length > 0);

    if (!allTasksCompleted) {
      return user.currentStreak;
    }

    let newStreak = 1;

    // check if user was active yesterday to continue streak
    if (user.lastActiveDate) {
      if (isSameDay(user.lastActiveDate, yesterday)) {
        newStreak = user.currentStreak + 1;
      } else if (!isSameDay(user.lastActiveDate, today)) {
        newStreak = 1;
      } else {
        return user.currentStreak;
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        currentStreak: newStreak,
        longestStreak: Math.max(user.longestStreak, newStreak),
        lastActiveDate: today,
      },
      select: {
        currentStreak: true,
      },
    });

    return updatedUser.currentStreak;
  } catch (error) {
    console.error("Error updating user streak:", error);
    return null;
  }
};

export const checkUserStreak = async () => {
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

    if (user.lastActiveDate && isSameDay(user.lastActiveDate, today)) {
      return;
    }

    if (
      user.lastActiveDate &&
      !isSameDay(user.lastActiveDate, yesterday) &&
      !isSameDay(user.lastActiveDate, today)
    ) {
      // More than 1 day gap, reset streak
      await prisma.user.update({
        where: { id: userId },
        data: {
          currentStreak: 0,
          lastActiveDate: today,
        },
      });
      return;
    }

    // Check yesterday's task completion
    const yesterdayTasks = await prisma.dailyTask.findMany({
      where: {
        userId,
        date: {
          gte: yesterday,
          lt: today,
        },
      },
      include: {
        completions: {
          where: {
            completedAt: {
              gte: yesterday,
              lt: today,
            },
          },
        },
      },
    });

    // If there were tasks yesterday and they weren't all completed, reset streak
    if (yesterdayTasks.length > 0) {
      const allCompleted = yesterdayTasks.every(
        (task) => task.completions.length > 0
      );

      if (!allCompleted && user.currentStreak > 0) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            currentStreak: 0,
            lastActiveDate: today,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error checking user streak:", error);
  }
};

export const completeDayAndUpdateStreak = async () => {
  try {
    const userId = await requireAuth();

    const today = startOfDay(new Date());

    const todayTasks = await prisma.dailyTask.findMany({
      where: {
        userId,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
      include: {
        completions: {
          where: {
            completedAt: {
              gte: today,
              lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
            },
          },
        },
      },
    });

    const allTasksCompleted =
      todayTasks.length > 0 &&
      todayTasks.every((task) => task.completions.length > 0);

    if (!allTasksCompleted) {
      return { success: false, message: "Not all tasks completed" };
    }

    const newStreak = await updateUserStreak();

    return { success: true, newStreak };
  } catch (error) {
    console.error("Error completing day:", error);
    return { success: false, message: "Failed to complete day" };
  }
};
