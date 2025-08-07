"use server";

import prisma from "@/prisma";
import { requireAuth } from "@/lib/utils/auth";
import { revalidatePath } from "next/cache";

export const startChallenge = async (challengeData: {
  duration: number;
  title: string | null;
  description: string | null;
  tasks: Array<{ name: string; dimensionId: string }>;
  nextDay: boolean | undefined | null;
}) => {
  try {
    const userId = await requireAuth();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw Error("User not found!");
    }

    return await prisma.$transaction(async (tx) => {
      const challenge = await tx.challenge.create({
        data: {
          name: challengeData.title,
          description: `Your personalized ${challengeData.duration} day challenge`,
          duration: challengeData.duration,
          icon: "custom",
        },
      });

      const tasks = await Promise.all(
        challengeData.tasks.map((task) =>
          tx.task.create({
            data: {
              name: task.name,
              dimensionId: task.dimensionId,
              points: Math.floor(Math.random() * (4 - 2 + 1)) + 1, // Random points between 2 and 4
            },
          })
        )
      );

      await tx.challengeTask.createMany({
        data: tasks.map((task) => ({
          challengeId: challenge.id,
          taskId: task.id,
        })),
      });

      const startDate = new Date();
      if (challengeData.nextDay) {
        startDate.setDate(startDate.getDate() + 1);
      }
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + challenge.duration);

      await tx.userChallenge.create({
        data: {
          userId,
          challengeId: challenge.id,
          startDate,
          endDate,
          progress: 0,
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: { challengeId: challenge.id },
      });

      const dailyTasks = Array.from(
        { length: challenge.duration },
        (_, day) => {
          const taskDate = new Date(startDate);
          taskDate.setDate(startDate.getDate() + day);
          return {
            date: taskDate,
            taskIds: tasks.map((t) => t.id),
          };
        }
      ).flatMap(({ date, taskIds }) =>
        taskIds.map((taskId) => ({
          userId,
          taskId,
          date,
        }))
      );

      await tx.dailyTask.createMany({
        data: dailyTasks,
        skipDuplicates: true,
      });

      revalidatePath("/dashboard");
      return { success: true, challengeId: challenge.id };
    });
  } catch (error) {
    console.error("Creation failed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Challenge creation failed",
    };
  }
};
