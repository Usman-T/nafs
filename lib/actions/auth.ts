"use server";
import { signIn } from "@/auth";
import prisma from "@/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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

    console.log("CREATING THE USER SETTINGS ABBYBYBYB")
    const userSettings = await prisma.userSettings.create({
      data: { userId: user.id },
    });
    console.log("USER SETTINGS CREATED", userSettings)

    await prisma.dimensionValue.createMany({
      data: dimVals,
    });

    revalidatePath("/dashboard");

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { message: "Account created successfully!", errors: {} };
  } catch (error: unknown) {
    console.error(error);
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
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
      redirect: false
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
