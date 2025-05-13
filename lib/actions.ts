"use server";

import { auth, signIn, signOut } from "@/auth";
import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";
import { getCurrentUserId, requireAuth } from "./auth";

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
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
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
  selectedTasks: number[]
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

    const [userChallenge] = await prisma.$transaction([
      prisma.userChallenge.create({
        data: {
          userId,
          challengeId,
          startDate: new Date(),
          endDate: new Date(
            new Date().setDate(new Date().getDate() + challenge.duration)
          ),
          progress: 0,
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { challengeId },
      }),
    ]);

    const dailyTasks = Array.from({ length: challenge.duration }, (_, day) => ({
      date: new Date(new Date().setDate(new Date().getDate() + day)),
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
          date: new Date(startDate.setDate(startDate.getDate() + day)),
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

export const logout = async () => {
  console.log("Logging out...");
  await signOut({ redirectTo: "/" });
};
