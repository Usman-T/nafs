"use server";

import prisma from "@/prisma";
import { requireAuth } from "../utils/auth";
import { startOfDay } from "date-fns";

export const ensureDailyTasksForToday = async () => {
  const userId = await requireAuth();
  const today = startOfDay(new Date());

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { currentChallenge: true },
  });

  if (!user?.currentChallenge?.id) return;


  const existingTasks = await prisma.dailyTask.findMany({
    where: { userId, date: today },
  });

  if (existingTasks.length === 0) {
    const challenge = await prisma.challenge.findUnique({
      where: { id: user.currentChallenge.id },
      include: { tasks: true },
    });

    if (!challenge) return;

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
};
