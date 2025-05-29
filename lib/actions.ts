"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";
import { requireAuth } from "./auth";
import { startOfDay, subDays, isSameDay, isYesterday } from "date-fns";

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirm?: string[];
    terms?: string[];
  };
  message?: string | null;
};

export type loginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

const UserSchema = z
  .object({
    name: z.string().min(1, "Please enter your name."),
    email: z
      .string()
      .min(1, "Please enter your email.")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string().min(1, "Please confirm your password"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email.")
    .email("Invalid email address"),
  password: z.string().min(1, "Please enter your password"),
});

export const createUser = async (prevState: State, formData: FormData) => {
  const validatedFields = UserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
    terms: formData.get("terms") === "on",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
    };
  }

  const { name, email, password } = validatedFields.data;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
    });

    const dimensions = await prisma.dimension.findMany();

    const dimVals = dimensions.map((dimension) => ({
      userId: user.id,
      dimensionId: dimension.id,
      value: 5,
    }));

    await prisma.dimensionValue.createMany({
      data: dimVals,
    });

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { message: "Account created successfully!", errors: {} };
  } catch (error: unknown) {
    console.error(error);
    if (error.code === "P2002") {
      return {
        errors: {
          email: ["Email already in use."],
        },
        message: "This email is already registered.",
      };
    }
    return {
      message: "An unknown error occurred while creating your account.",
      errors: {},
    };
  }
};

export const login = async (prevState: loginState, formData: FormData) => {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
    });

    return { message: "Login successful!", errors: {} };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: {},
            message: "invalid",
          };
        default:
          return {
            errors: {},
            message: "Something went wrong. Please try again.",
          };
      }
    }
    throw error;
  }
};

export const enrollInExistingChallenge = async (
  challengeId: string,
  selectedTasks: number[],
  nextDay: boolean | undefined | null
) => {
  try {
    const userId = await requireAuth();

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

    // Adjust startDate based on nextDay flag
    const startDate = new Date();
    if (nextDay) {
      startDate.setDate(startDate.getDate() + 1);
    }

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + challenge.duration);

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
    const dailyTasks = Array.from({ length: challenge.duration }, (_, day) => ({
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

export const createCustomChallenge = async (challengeData: {
  title: string;
  description: string;
  duration: number;
  tasks: Array<{ name: string; dimensionId: string }>;
  nextDay: boolean | undefined | null;
}) => {
  try {
    const userId = await requireAuth();

    return await prisma.$transaction(async (tx) => {
      const challenge = await tx.challenge.create({
        data: {
          name: challengeData.title,
          description: challengeData.description,
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

      const dailyTasks = Array.from(
        { length: challengeData.duration },
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
  } catch (error) {
    console.error("Creation failed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Challenge creation failed",
    };
  }
};

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

    // If already checked today, skip
    if (user.lastActiveDate && isSameDay(user.lastActiveDate, today)) {
      return;
    }

    // Check if user missed yesterday (streak should be broken)
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

export const completeChallenge = async (challengeId: string) => {
  try {
    const userId = await requireAuth();

    await prisma.$transaction([
      prisma.userChallenge.updateMany({
        where: { userId, challengeId },
        data: { completed: true, progress: 100 },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { challengeId: null },
      }),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Error completing challenge:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to complete challenge",
    };
  }
};

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

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  localStorage.clear();
};
