"use server";

import prisma from "@/prisma";
import { requireAuth } from "@/lib/auth";

export const completeTask = async (taskId: string) => {
  try {
    const userId = await requireAuth();

    const dailyTask = await prisma.dailyTask.findUnique({
      where: { id: taskId },
      include: {
        task: {
          include: {
            dimension: true,
          },
        },
      },
    });

    if (!dailyTask) throw new Error("Task not found");

    const existingCompletion = await prisma.completedTask.findFirst({
      where: { dailyTaskId: taskId, userId },
    });

    if (existingCompletion) {
      return { success: false, message: "Task already completed" };
    }

    await prisma.completedTask.create({
      data: {
        userId,
        dailyTaskId: taskId,
      },
    });

    await prisma.dimensionValue.update({
      where: {
        userId_dimensionId: {
          userId,
          dimensionId: dailyTask.task.dimensionId,
        },
      },
      data: {
        value: {
          increment: 1,
        },
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { challengeId: true },
    });

    if (!user?.challengeId) return { success: true };

    const totalTasks = await prisma.challengeTask.count({
      where: { challengeId: user.challengeId },
    });

    const completedTasks = await prisma.completedTask.count({
      where: {
        userId,
        dailyTask: {
          task: {
            challenges: {
              some: { challengeId: user.challengeId },
            },
          },
        },
      },
    });

    const progress = Math.min((completedTasks / totalTasks) * 100, 100);

    await prisma.userChallenge.updateMany({
      where: { userId, challengeId: user.challengeId },
      data: { progress },
    });

    return { success: true };
  } catch (error) {
    console.error("Error completing task:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to complete task",
    };
  }
};
