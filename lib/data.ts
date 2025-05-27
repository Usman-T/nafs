import prisma from "@/prisma";
import { auth } from "@/auth";
import { isSameDay, subDays } from "date-fns";

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

  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
    include: {
      currentChallenge: true,
    },
  });

  return user?.currentChallenge;
};

export const fetchDailyTasks = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
    include: {
      dailyTasks: {
        include: {
          task: {
            include: {
              dimension: true,
            },
          },
          completions: true,
          user: {
            include: {
              currentChallenge: true,
            },
          },
        },
      },
    },
  });

  return user?.dailyTasks;
};

export const fetchUserChallenge = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
    include: {
      currentChallenge: true,
      challenges: {
        include: {
          challenge: {
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
          },
        },
      },
    },
  });

  return user?.challenges.find(
    (userChallenge) => userChallenge.challengeId === user.challengeId
  );
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

export const fetchUserDimensions = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email ?? undefined,
    },
    include: {
      dimensionValues: {
        include: {
          dimension: true,
        },
      },
    },
  });

  return user?.dimensionValues?.map((dimensionValue) => ({
    id: dimensionValue.id,
    value: dimensionValue.value / 100,
    dimension: {
      id: dimensionValue.dimension.id,
      name: dimensionValue.dimension.name,
      description: dimensionValue.dimension.description,
      color: dimensionValue.dimension.color,
      icon: dimensionValue.dimension.icon,
    },
  }));
};

export const fetchChallengeCompletionStatus = async () => {
  const session = await auth();

  if (!session?.user) throw new Error("Not authenticated");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
    include: {
      currentChallenge: true,
      dailyTasks: true,
      completedTasks: {
        include: { dailyTask: true },
      },
    },
  });

  if (!user?.currentChallenge) return false;

  const today = new Date();
  const duration = user.currentChallenge.duration;

  const completedMap: Record<string, Set<string>> = {};
  for (const ct of user.completedTasks) {
    const dateStr = new Date(ct.completedAt).toDateString();
    if (!completedMap[dateStr]) completedMap[dateStr] = new Set();
    completedMap[dateStr].add(ct.dailyTaskId);
  }

  for (let i = 0; i < duration; i++) {
    const day = subDays(today, i);
    const dayStr = day.toDateString();

    const tasksForDay = user.dailyTasks.filter((dt) =>
      isSameDay(new Date(dt.date), day)
    );

    if (tasksForDay.length === 0) return false;

    for (const task of tasksForDay) {
      const completedSet = completedMap[dayStr];
      if (!completedSet || !completedSet.has(task.id)) {
        return false;
      }
    }
  }

  return true;
};
