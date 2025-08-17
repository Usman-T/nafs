"use server";

import prisma from "@/prisma";
import { requireAuth } from "@/lib/utils/auth";
import { revalidatePath } from "next/cache";

export const startChallenge = async (challengeData: {
  title: string | null;
  description: string | null;
  duration: number;
  tasks: Array<{ name: string; dimensionId: string }>;
  nextDay?: boolean | null;
}) => {
  try {
    const userId = await requireAuth();
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found!");

    return await prisma.$transaction(async (tx) => {
      // determine dominant dimension
      const dimensionCount: Record<string, number> = {};
      challengeData.tasks.forEach((task) => {
        dimensionCount[task.dimensionId] =
          (dimensionCount[task.dimensionId] || 0) + 1;
      });

      const maxCount = Math.max(...Object.values(dimensionCount));
      const dominantDimensions = Object.keys(dimensionCount).filter(
        (dim) => dimensionCount[dim] === maxCount
      );

      console.log("Dominant dimensions", dominantDimensions);

      const mostActiveDim = await tx.dimension.findFirst({
        where: { id: { in: dominantDimensions } },
        select: { id: true, name: true },
      });

      console.log("Most active dimension:", mostActiveDim);

      let challengeName: string;
      let challengeDescription: string;

      if (dominantDimensions.length === 1) {
        challengeName = `${mostActiveDim.name} Mastery`;
        challengeDescription = `A ${challengeData.duration}-day challenge focused on ${mostActiveDim.name}`;
      } else {
        challengeName = "Balanced Growth";
        challengeDescription = `Level up in ${challengeData.duration} days with balanced growth.`;
      }

      const challenge = await tx.challenge.create({
        data: {
          name: challengeName,
          description: challengeDescription,
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
              points: Math.floor(Math.random() * 3) + 2,
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
      if (challengeData.nextDay) startDate.setDate(startDate.getDate() + 1);

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + challengeData.duration);

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

      revalidatePath("/dashboard");

      return { success: true, challengeId: challenge.id };
    });
  } catch (error) {
    console.error("Challenge creation failed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Challenge creation failed",
    };
  }
};
