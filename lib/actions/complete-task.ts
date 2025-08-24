"use server";

import prisma from "@/prisma";
import { requireAuth } from "@/lib/utils/auth";
import { revalidatePath } from "next/cache";

export const completeTask = async (taskId: string) => {
  try {
    const userId = await requireAuth();
    const dailyTask = await prisma.dailyTask.findUnique({
      where: { id: taskId },
      include: { task: { include: { dimension: true } } },
    });

    if (!dailyTask) throw new Error("task not found");

    const existingCompletion = await prisma.completedTask.findFirst({
      where: { dailyTaskId: taskId, userId },
    });

    if (existingCompletion) {
      return { success: false, message: "task already completed" };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { challengeId: true },
    });

    await prisma.$transaction(async (tx) => {
      await tx.completedTask.create({
        data: { userId, dailyTaskId: taskId },
      });

      await tx.dimensionValue.update({
        where: {
          userId_dimensionId: {
            userId,
            dimensionId: dailyTask.task.dimensionId,
          },
        },
        data: { value: { increment: dailyTask.task.points ?? 2 } },
      });

      if (user?.challengeId) {
        const totalTasks = await tx.challengeTask.count({
          where: { challengeId: user.challengeId },
        });

        const completedTasks = await tx.completedTask.count({
          where: {
            userId,
            dailyTask: {
              task: { challenges: { some: { challengeId: user.challengeId } } },
            },
          },
        });

        const progress = Math.min((completedTasks / totalTasks) * 100, 100);

        await tx.userChallenge.updateMany({
          where: { userId, challengeId: user.challengeId },
          data: { progress },
        });
      }
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("error completing task:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "failed to complete task",
    };
  }
};
