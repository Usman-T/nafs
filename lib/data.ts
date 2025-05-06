import prisma from "@/prisma";
import { auth } from "@/auth";

export const getUsers = async () => {
  try {
    const users = prisma.user.findMany({});
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch users.");
  }
};

export const fetchCurrentChallenge = async () => {
  const session = await auth();

  console.log(session?.user);

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return user;
};
