"use server";
import prisma from "@/prisma";
import bcrypt from "bcryptjs";
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

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: passwordHash,
    },
  });

  console.log("Registered user successfully: ", user);
};
