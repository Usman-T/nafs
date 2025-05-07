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

  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
    include: {
      currentChallenge: true,
    },
  });

  console.log({ user });

  return user?.currentChallenge;
};

export const fetchChallenges = async () => {
  const predefinedChallenges = [
    {
      id: "ramadan-readiness",
      title: "Ramadan Readiness",
      description: "Prepare spiritually and physically for the blessed month",
      duration: 30,
      difficulty: "Medium",
      tasks: [
        {
          name: "Fasting Monday & Thursday",
          dimension: "Salah",
          icon: PrayingHandsIcon,
          color: "#fb4934",
        },
        {
          name: "Read 5 pages of Quran",
          dimension: "Quran",
          icon: BookOpen,
          color: "#8ec07c",
        },
        {
          name: "Give charity today",
          dimension: "Charity",
          icon: Heart,
          color: "#fe8019",
        },
        {
          name: "Attend Islamic lecture",
          dimension: "Knowledge",
          icon: Compass,
          color: "#fabd2f",
        },
        {
          name: "Extra night prayers",
          dimension: "Dhikr",
          icon: Moon,
          color: "#d3869b",
        },
      ],
    },
    {
      id: "quran-connection",
      title: "Quran Connection",
      description: "Deepen your relationship with the Book of Allah",
      duration: 21,
      difficulty: "Easy",
      tasks: [
        {
          name: "Read 1 page with translation",
          dimension: "Quran",
          icon: BookOpen,
          color: "#8ec07c",
        },
        {
          name: "Memorize 3 new verses",
          dimension: "Quran",
          icon: BookOpen,
          color: "#8ec07c",
        },
        {
          name: "Review previously memorized verses",
          dimension: "Quran",
          icon: BookOpen,
          color: "#8ec07c",
        },
        {
          name: "Listen to Quran recitation",
          dimension: "Dhikr",
          icon: Moon,
          color: "#d3869b",
        },
        {
          name: "Share a verse with a friend",
          dimension: "Community",
          icon: Users,
          color: "#fabd2f",
        },
      ],
    },
    {
      id: "character-excellence",
      title: "Character Excellence",
      description: "Embody the prophetic character in daily interactions",
      duration: 14,
      difficulty: "Medium",
      tasks: [
        {
          name: "Practice patience in a difficult situation",
          dimension: "Character",
          icon: Sunrise,
          color: "#fb4934",
        },
        {
          name: "Express gratitude to someone",
          dimension: "Character",
          icon: Sunrise,
          color: "#fb4934",
        },
        {
          name: "Forgive someone who wronged you",
          dimension: "Character",
          icon: Sunrise,
          color: "#fb4934",
        },
        {
          name: "Help someone in need",
          dimension: "Charity",
          icon: Heart,
          color: "#fe8019",
        },
        {
          name: "Smile and spread positivity",
          dimension: "Community",
          icon: Users,
          color: "#fabd2f",
        },
      ],
    },
  ];
  return predefinedChallenges;
};
