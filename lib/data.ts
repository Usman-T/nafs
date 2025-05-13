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


  if (!session?.user) {
    throw new Error("Not authenticated");
  }
  console.log(session.user)

  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
    include: {
      currentChallenge: true,
    },
  });

  return user?.currentChallenge;
};

export const fetchChallenges = async () => {
  const challenges = await prisma.challenge.findMany({
    take: 3,
    orderBy: {
      createdAt: "asc",
    },
    include: {
      tasks: {
        include: {
          task: {
            include: {
              dimension: true,
            },
          },
        },
      },
    },
  });

  return challenges;
};

export const fetchDimensions = async () => {
  const dimensions = await prisma.dimension.findMany({});

  return dimensions;
};
