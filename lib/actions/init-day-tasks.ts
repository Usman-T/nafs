"use server";

import prisma from "@/prisma";

export const initializeDayTasks = async (challengeId: string) => {
  const userChallenge = await prisma.userChallenge.findUnique({
    where: {
      id: challengeId,
    },
    include: {
      challenge: {
        include: {
          tasks: {
            include: {
              task: true,
            },
          },
        },
      },
      user: {
        include: {
          dailyTasks: true,
        },
      },
    },
  });

  if (!userChallenge) {
    throw new Error("User challenge not found");
  }

  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));

  const existingDailyTasks = await prisma.dailyTask.findMany({
    where: {
      userId: userChallenge.userId,
      date: startOfToday,
    },
  });

  if (existingDailyTasks.length === 0) {
    const mostRecentTask = await prisma.dailyTask.findFirst({
      where: {
        userId: userChallenge.userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    if (mostRecentTask) {
      const recentDate = mostRecentTask.date;
      const recentTasks = await prisma.dailyTask.findMany({
        where: {
          userId: userChallenge.userId,
          date: recentDate,
        },
      });

      const dailyTasks = recentTasks.map((task) => ({
        userId: task.userId,
        taskId: task.taskId,
        date: startOfToday,
      }));

      await prisma.dailyTask.createMany({
        data: dailyTasks,
        skipDuplicates: true,
      });
    } else {
      const dailyTasks = userChallenge.challenge.tasks.map((ct) => ({
        userId: userChallenge.userId,
        taskId: ct.task.id,
        date: startOfToday,
      }));

      await prisma.dailyTask.createMany({
        data: dailyTasks,
        skipDuplicates: true,
      });
    }
  }
};
