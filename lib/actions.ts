"use server";

import { signIn } from "@/auth";
import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const createUser = async (formData: FormData) => {
  const { name, email, password } = UserSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

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
    console.log(user);

    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
};

export const login = async (
  prevState: string | undefined,
  formData: FormData
) => {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }

    throw error;
  }
};
