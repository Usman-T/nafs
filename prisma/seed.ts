import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  console.time("Seeding complete 🌱");
  await prisma.challengeTask.deleteMany();
  await prisma.task.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.dimension.deleteMany();

  await Promise.all([
    prisma.dimension.create({
      data: {
        name: "Faith",
        description:
          "Iman in practice - Salah, sincerity, intentions, tawakkul",
        color: "#00FFF7",
        icon: "Sparkles",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Remembrance",
        description:
          "Inner connection to Allah - Dhikr, du'a, istighfar, presence",
        color: "#FF6EC7",
        icon: "Brain",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Knowledge",
        description:
          "Learning for the soul - Quran, Hadith, Islamic studies, reflection",
        color: "#FFD300",
        icon: "BookOpen",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Character",
        description:
          "The Sunnah in action - Manners, patience, honesty, humility",
        color: "#39FF14",
        icon: "HeartHandshake",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Discipline",
        description:
          "Mastering the self - Fajr wake-ups, fasting, time management, resisting the nafs",
        color: "#FF073A",
        icon: "AlarmClock",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Body",
        description:
          "The amana of your health - Sleep, exercise, energy, nutrition",
        color: "#00BFFF",
        icon: "Dumbbell",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Purpose",
        description:
          "Ambition for the akhirah & dunya - Meaningful goals with divine intention",
        color: "#B026FF",
        icon: "Target",
      },
    }),
  ]);

  const dimensions = await prisma.dimension.findMany();

  const getDimensionId = (name: string) =>
    dimensions.find((d) => d.name === name)?.id || "";

  await prisma.task.createMany({
    data: [
      {
        name: "Pray Fajr in congregation/masjid",
        dimensionId: getDimensionId("Faith"),
        points: 4,
      },
      {
        name: "Recite morning/evening adhkar",
        dimensionId: getDimensionId("Faith"),
        points: 3,
      },
      {
        name: "Fast a sunnah day (Mon/Thurs)",
        dimensionId: getDimensionId("Faith"),
        points: 5,
      },

      // Remembrance tasks
      {
        name: "Istighfar 100 times",
        dimensionId: getDimensionId("Remembrance"),
        points: 3,
      },
      {
        name: "Send salawat 50 times",
        dimensionId: getDimensionId("Remembrance"),
        points: 3,
      },
      {
        name: "5-minute mindful dhikr session",
        dimensionId: getDimensionId("Remembrance"),
        points: 2,
      },

      // Knowledge tasks
      {
        name: "Read Quran with translation (1 page)",
        dimensionId: getDimensionId("Knowledge"),
        points: 3,
      },
      {
        name: "Learn and reflect on 1 hadith",
        dimensionId: getDimensionId("Knowledge"),
        points: 2,
      },
      {
        name: "Listen to Islamic lecture (15 mins)",
        dimensionId: getDimensionId("Knowledge"),
        points: 2,
      },

      // Character tasks
      {
        name: "Give secret charity",
        dimensionId: getDimensionId("Character"),
        points: 4,
      },
      {
        name: "Visit/call a family member",
        dimensionId: getDimensionId("Character"),
        points: 3,
      },
      {
        name: "Hold back anger in a situation",
        dimensionId: getDimensionId("Character"),
        points: 3,
      },

      // Discipline tasks
      {
        name: "No social media before Dhuhr",
        dimensionId: getDimensionId("Discipline"),
        points: 3,
      },
      {
        name: "Sleep by 11pm, wake by Fajr",
        dimensionId: getDimensionId("Discipline"),
        points: 4,
      },
      {
        name: "Complete most important task first",
        dimensionId: getDimensionId("Discipline"),
        points: 3,
      },

      // Body tasks
      {
        name: "30-minute walk or workout",
        dimensionId: getDimensionId("Body"),
        points: 3,
      },
      {
        name: "Drink 2L water, avoid junk food",
        dimensionId: getDimensionId("Body"),
        points: 3,
      },
      {
        name: "Stretch and posture exercises",
        dimensionId: getDimensionId("Body"),
        points: 2,
      },

      // Purpose tasks
      {
        name: "Set and review daily intentions",
        dimensionId: getDimensionId("Purpose"),
        points: 2,
      },
      {
        name: "Journal 3 things you're grateful for",
        dimensionId: getDimensionId("Purpose"),
        points: 2,
      },
      {
        name: "Plan next day before sleeping",
        dimensionId: getDimensionId("Purpose"),
        points: 2,
      },
    ],
  });
  const tasks = await prisma.task.findMany();

  const getTaskId = (name: string) =>
    tasks.find((t) => t.name === name)?.id || "";

  await prisma.challenge.createMany({
    data: [
      {
        name: "Spiritual Reset",
        description: "Reconnect with Allah through focused worship",
        duration: 3,
      },
      {
        name: "Prophetic Lifestyle",
        description: "Emulate the Sunnah in your daily routine",
        duration: 3,
      },
      {
        name: "Holistic Growth",
        description: "Balance all dimensions of your faith",
        duration: 3,
      },
    ],
  });

  const challenges = await prisma.challenge.findMany();

  await prisma.challengeTask.createMany({
    data: [
      {
        challengeId: challenges[0].id,
        taskId: getTaskId("Pray Fajr in congregation/masjid"),
      },
      {
        challengeId: challenges[0].id,
        taskId: getTaskId("Istighfar 100 times"),
      },
      {
        challengeId: challenges[0].id,
        taskId: getTaskId("Read Quran with translation (1 page)"),
      },
      {
        challengeId: challenges[0].id,
        taskId: getTaskId("5-minute mindful dhikr session"),
      },
      {
        challengeId: challenges[0].id,
        taskId: getTaskId("Journal 3 things you're grateful for"),
      },

      // Prophetic Lifestyle Challenge
      {
        challengeId: challenges[1].id,
        taskId: getTaskId("Fast a sunnah day (Mon/Thurs)"),
      },
      {
        challengeId: challenges[1].id,
        taskId: getTaskId("Send salawat 50 times"),
      },
      {
        challengeId: challenges[1].id,
        taskId: getTaskId("Give secret charity"),
      },
      {
        challengeId: challenges[1].id,
        taskId: getTaskId("Sleep by 11pm, wake by Fajr"),
      },
      {
        challengeId: challenges[1].id,
        taskId: getTaskId("30-minute walk or workout"),
      },

      // Holistic Growth Challenge
      {
        challengeId: challenges[2].id,
        taskId: getTaskId("Recite morning/evening adhkar"),
      },
      {
        challengeId: challenges[2].id,
        taskId: getTaskId("Learn and reflect on 1 hadith"),
      },
      {
        challengeId: challenges[2].id,
        taskId: getTaskId("Visit/call a family member"),
      },
      {
        challengeId: challenges[2].id,
        taskId: getTaskId("Drink 2L water, avoid junk food"),
      },
      {
        challengeId: challenges[2].id,
        taskId: getTaskId("Set and review daily intentions"),
      },
    ],
  });
  console.timeEnd("Seeding complete 🌱");
};

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .then(() => {
    console.log("Process completed successfully.");
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
