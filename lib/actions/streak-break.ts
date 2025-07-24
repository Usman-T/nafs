import prisma from "@/prisma";
import { requireAuth } from "@/lib/utils/auth";
import { startOfDay } from "date-fns";
import { auth } from "@/auth";
import { DailyTask } from "@prisma/client";

export const resetTasks = async () => {
  try {
    const userId = await requireAuth();
    const today = startOfDay(new Date());

    const futureTasks = await prisma.dailyTask.findMany({
      where: {
        userId,
        date: {
          gte: today,
        },
      },
      include: {
        completions: true,
      },
    });

    const taskIds = futureTasks.map((task) => task.id);
    const completionIds = futureTasks.flatMap((task) =>
      task.completions.map((c) => c.id)
    );

    if (completionIds.length > 0) {
      await prisma.completedTask.deleteMany({
        where: {
          id: {
            in: completionIds,
          },
        },
      });
    }

    if (taskIds.length > 0) {
      await prisma.dailyTask.deleteMany({
        where: {
          id: {
            in: taskIds,
          },
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error resetting tasks:", error);
    console.log(error);
    return { success: false, message: "Could not reset tasks." };
  }
};

export const dimensionsReset = async (missedTasks: DailyTask[]) => {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;

  for (const task of missedTasks) {
    await prisma.dimensionValue.update({
      where: {
        userId_dimensionId: {
          userId,
          dimensionId: task.dimensionId,
        },
      },
      data: {
        value: {
          decrement: task.points,
        },
      },
    });
  }

  return { success: true };
};
