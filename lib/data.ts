import prisma from "@/prisma";
import { auth } from "@/auth";
import { isSameDay, startOfDay, subDays } from "date-fns";
import { initializeDayTasks } from "./actions";
import { Prisma, Reflection, SavedAyah, User } from "@prisma/client";
import { redirect, RedirectType } from "next/navigation";

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
          completedTasks: true,
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
    const dateStr = ct.completedAt.toISOString().slice(0, 10);
    if (!completedMap[dateStr]) completedMap[dateStr] = new Set();
    completedMap[dateStr].add(ct.dailyTaskId);
  }

  const dailyTasksMap: Record<string, typeof user.dailyTasks> = {};
  for (const dt of user.dailyTasks) {
    const dateStr = new Date(dt.date).toISOString().slice(0, 10);
    if (!dailyTasksMap[dateStr]) dailyTasksMap[dateStr] = [];
    dailyTasksMap[dateStr].push(dt);
  }

  for (let i = 0; i < duration; i++) {
    const day = subDays(today, i);
    const dayStr = day.toISOString().slice(0, 10);

    const tasksForDay = dailyTasksMap[dayStr];
    if (!tasksForDay || tasksForDay.length === 0) return false;

    const completedSet = completedMap[dayStr];
    for (const task of tasksForDay) {
      if (!completedSet?.has(task.id)) return false;
    }
  }

  return true;
};

export const fetchUserLevel = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
    select: {
      level: true,
    },
  });

  return user?.level ?? 1;
};

export const loadChallengesPageData = async () => {
  const currentChallenge = await fetchUserChallenge();
  const dailyTasks = await fetchDailyTasks();
  const dimensions = await fetchDimensions();
  const dimensionValues = await fetchUserDimensions();
  const hasCompletedChallenge = await fetchChallengeCompletionStatus();

  const today = new Date();
  let todayTasks = dailyTasks?.filter((t) => isSameDay(t.date, today));

  if (!todayTasks?.length && currentChallenge) {
    await initializeDayTasks(currentChallenge.id);
    const updatedTasks = await fetchDailyTasks();
    todayTasks = updatedTasks?.filter((t) => isSameDay(t.date, today));
  }
  return {
    currentChallenge,
    dailyTasks,
    dimensions,
    dimensionValues,
    hasCompletedChallenge,
  };
};

export const loadStreakBreakPageData = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/onboarding");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
    include: {
      currentChallenge: true,
      dailyTasks: {
        include: {
          task: {
            include: {
              dimension: true,
            },
          },
          // Use completions as shown in your user log
          completions: true,
        },
      },
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
      dimensionValues: {
        include: {
          dimension: true,
        },
      },
    },
  });

  if (!user?.currentChallenge) redirect("/onboarding");
  
  console.log(user);

  // Fetch additional data
  const challenges = await fetchChallenges();
  const spiritualDimensions = await fetchDimensions();
  const userLevel = await fetchUserLevel();

  // Find the current challenge from user's challenges
  const currentChallenge = user.challenges.find(
    (userChallenge) => userChallenge.challengeId === user.challengeId
  );

  if (!currentChallenge) {
    return {
      missedTasks: [],
      challenges,
      spiritualDimensions,
      currentValues: {},
      previousValues: {},
      currentChallenge: null,
      userLevel,
      missedDay: null,
    };
  }

  // Group daily tasks by date
  const groupedByDate = user.dailyTasks.reduce((acc, task) => {
    const day = startOfDay(new Date(task.date)).toISOString();
    acc[day] = acc[day] || [];
    acc[day].push(task);
    return acc;
  }, {} as Record<string, typeof user.dailyTasks>);

  // Find dates with missed tasks (only check tasks that are due - today or in the past)
  const today = new Date();
  const missedDates = Object.entries(groupedByDate).filter(([dateStr, tasks]) => {
    const taskDate = new Date(dateStr);
    
    // Only check tasks that are due (today or in the past)
    if (taskDate > today) return false;
    
    return tasks.some((task) => {
      // Check completions as in your user log
      return (
        task.completions.length === 0 ||
        task.completions.every((completion) => 
          !isSameDay(new Date(completion.completedAt), taskDate)
        )
      );
    });
  });

  // If no missed dates, return empty state
  if (missedDates.length === 0) {
    return {
      missedTasks: [],
      challenges,
      spiritualDimensions,
      currentValues: user.dimensionValues.reduce((acc, dv) => {
        acc[dv.dimension.id] = dv.value / 100;
        return acc;
      }, {} as Record<string, number>),
      previousValues: user.dimensionValues.reduce((acc, dv) => {
        acc[dv.dimension.id] = dv.value / 100;
        return acc;
      }, {} as Record<string, number>),
      currentChallenge: currentChallenge.challenge,
      userLevel,
      missedDay: null,
    };
  }

  // Find the most recent missed date
  const [mostRecentMissedDate, missedTasksArray] = missedDates.sort(
    ([a], [b]) => new Date(b).getTime() - new Date(a).getTime()
  )[0];

  const missedDay = new Date(mostRecentMissedDate);

  // Get the specific missed tasks from the most recent missed date
  const missedTasks = missedTasksArray
    .filter((task) => {
      // Check completions as in your user log
      return (
        task.completions.length === 0 ||
        task.completions.every((completion) => 
          !isSameDay(new Date(completion.completedAt), missedDay)
        )
      );
    })
    .map((task) => ({
      id: task.id,
      name: task.task.name,
      dimension: task.task.dimension.name,
      color: task.task.dimension.color,
      icon: task.task.dimension.icon,
      dimensionId: task.task.dimension.id,
      points: task.task.points,
    }));

  // Calculate previous dimension values (before penalty)
  const previousValues = user.dimensionValues.reduce((acc, dv) => {
    acc[dv.dimension.id] = dv.value / 100;
    return acc;
  }, {} as Record<string, number>);

  // Calculate current values (after penalty for missed tasks)
  const currentValues = { ...previousValues };
  for (const missed of missedTasks) {
    if (currentValues[missed.dimensionId] !== undefined) {
      // Apply penalty - subtract points and ensure it doesn't go below 0
      currentValues[missed.dimensionId] = Math.max(
        0, 
        currentValues[missed.dimensionId] - (missed.points / 100)
      );
    }
  }

  // Calculate which day of the challenge was missed
  const challengeStartDate = new Date(currentChallenge.startDate);
  const missedDayNumber = Math.max(
    1,
    Math.ceil(
      (missedDay.getTime() - challengeStartDate.getTime()) / (1000 * 60 * 60 * 24) + 1
    )
  );

  return {
    missedTasks,
    challenges,
    spiritualDimensions,
    currentValues,
    previousValues,
    currentChallenge: currentChallenge.challenge,
    userLevel,
    missedDay: missedDayNumber,
  };
};

export const fetchGuidancePageStats = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not authenticated.");
  }

  const user = (await prisma.user.findUnique({
    where: { email: session?.user?.email },
    include: { savedAyahs: true, reflections: true },
  })) as Prisma.UserGetPayload<{
    include: {
      savedAyahs: true;
      reflections: true;
    };
  }>;

  return {
    readingStreak: user?.readingStreak,
    savedAyahs: user?.savedAyahs.length,
    reflections: user?.reflections.length,
  };
};

export const fetchFeaturedSurahs = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const user = (await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
    include: {
      readings: true,
    },
  })) as Prisma.UserGetPayload<{
    include: {
      readings: true;
    };
  }>;

  return { readings: user?.readings };
};

export const getSavedAyahs = async (): Promise<SavedAyah[]> => {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      savedAyahs: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.savedAyahs;
};

export const getReflections = async (): Promise<Reflection[]> => {
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

  const reflections = await prisma.reflection.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reflections;
};
