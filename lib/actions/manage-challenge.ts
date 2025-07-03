"use server";

import prisma from "@/prisma";
import { requireAuth } from "@/lib/utils/auth";

export const enrollInExistingChallenge = async (
  challengeId: string,
  selectedTasks: number[],
  duration: number,
  nextDay: boolean | undefined | null
) => {
  try {
    const userId = await requireAuth();
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw Error("User not found!");
    }

    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
      include: {
        tasks: {
          include: { task: true },
        },
      },
    });

    if (!challenge) throw new Error("Challenge not found");

    const selectedTaskIds = challenge.tasks
      .filter((_, index) => selectedTasks.includes(index))
      .map((task) => task.taskId);

    const startDate = new Date();
    if (nextDay) {
      startDate.setDate(startDate.getDate() + 1);
    }

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + duration);

    await prisma.$transaction([
      prisma.userChallenge.create({
        data: {
          userId,
          challengeId,
          startDate,
          endDate,
          progress: 0,
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { challengeId },
      }),
    ]);

    // Generate daily tasks starting from the adjusted startDate
    const dailyTasks = Array.from({ length: duration }, (_, day) => ({
      date: new Date(new Date(startDate).setDate(startDate.getDate() + day)),
      taskIds: selectedTaskIds,
    })).flatMap(({ date, taskIds }) =>
      taskIds.map((taskId) => ({
        userId,
        taskId,
        date,
      }))
    );

    await prisma.dailyTask.createMany({
      data: dailyTasks,
      skipDuplicates: true,
    });

    return { success: true };
  } catch (error) {
    console.error("Enrollment failed:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Enrollment failed",
    };
  }
};

export const createCustomChallenge = async (
  selectedChallengeId: string | null,
  duration: number,
  challengeData: {
    title: string | null;
    description: string | null;
    tasks: Array<{ name: string; dimensionId: string }> | number[];
    nextDay: boolean | undefined | null;
  }
) => {
  try {
    const userId = await requireAuth();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw Error("User not found!");
    }
    
    let existingChallenge;

    if (selectedChallengeId) {
      existingChallenge = await prisma.challenge.findUnique({
        where: { id: selectedChallengeId },
        include: {
          tasks: {
            include: { task: true },
          },
        },
      });
    }

    if (existingChallenge) {
      // For existing challenges, challengeData.tasks contains selected indices
      const selectedTaskIds = existingChallenge.tasks
        .filter((_, index) => (challengeData.tasks as number[]).includes(index))
        .map((challengeTask) => challengeTask.taskId);

      const startDate = new Date();
      if (challengeData.nextDay) {
        startDate.setDate(startDate.getDate() + 1);
      }

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + duration);

      await prisma.$transaction([
        prisma.userChallenge.create({
          data: {
            userId,
            selectedChallengeId,
            startDate,
            endDate,
            progress: 0,
          },
        }),
        prisma.user.update({
          where: { id: userId },
          data: { selectedChallengeId },
        }),
      ]);

      const dailyTasks = Array.from({ length: duration }, (_, day) => ({
        date: new Date(new Date(startDate).setDate(startDate.getDate() + day)),
        taskIds: selectedTaskIds,
      })).flatMap(({ date, taskIds }) =>
        taskIds.map((taskId) => ({
          userId,
          taskId,
          date,
        }))
      );

      await prisma.dailyTask.createMany({
        data: dailyTasks,
        skipDuplicates: true,
      });

      return { success: true, challengeId: selectedChallengeId };
    } else {
      return await prisma.$transaction(async (tx) => {
        const challenge = await tx.challenge.create({
          data: {
            name: challengeData.title,
            description: challengeData.description,
            duration: duration,
            icon: "custom",
          },
        });

        const tasks = await Promise.all(
          challengeData.tasks.map((task) =>
            tx.task.create({
              data: {
                name: task.name,
                dimensionId: task.dimensionId,
                points: 1,
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
        endDate.setDate(startDate.getDate() + duration);

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
          { length: duration },
          (_, day) => ({
            date: new Date(
              new Date(startDate).setDate(startDate.getDate() + day)
            ),
            taskIds: tasks.map((t) => t.id),
          })
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

        return { success: true, challengeId: challenge.id };
      });
    }
  } catch (error) {
    console.error("Creation failed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Challenge creation failed",
    };
  }
};