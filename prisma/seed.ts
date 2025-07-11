import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SHOULD_RESET = process.env.SEED_RESET === "true";

const main = async () => {
  if (!SHOULD_RESET) {
    console.warn("⚠️  Skipping seed: SEED_RESET env var not set to 'true'");
    return;
  }

  console.time("🌱 Seeding complete");

  await prisma.$transaction([
    prisma.challengeTask.deleteMany(),
    prisma.dailyTask.deleteMany(),
    prisma.task.deleteMany(),
    prisma.challenge.deleteMany(),
    prisma.dimension.deleteMany(),
  ]);

  const dimensionEntries = [
    {
      name: "Faith",
      description: "Iman in practice - Salah, sincerity, intentions, tawakkul",
      color: "#00FFF7",
      icon: "Sparkles",
    },
    {
      name: "Remembrance",
      description: "Inner connection to Allah - Dhikr, du'a, istighfar, presence",
      color: "#FF6EC7",
      icon: "Brain",
    },
    {
      name: "Knowledge",
      description: "Learning for the soul - Quran, Hadith, Islamic studies, reflection",
      color: "#FFD300",
      icon: "BookOpen",
    },
    {
      name: "Character",
      description: "The Sunnah in action - Manners, patience, honesty, humility",
      color: "#39FF14",
      icon: "HeartHandshake",
    },
    {
      name: "Discipline",
      description: "Mastering the self - Fajr wake-ups, fasting, time management, resisting the nafs",
      color: "#FF073A",
      icon: "AlarmClock",
    },
    {
      name: "Body",
      description: "The amana of your health - Sleep, exercise, energy, nutrition",
      color: "#00BFFF",
      icon: "Dumbbell",
    },
    {
      name: "Purpose",
      description: "Ambition for the akhirah & dunya - Meaningful goals with divine intention",
      color: "#B026FF",
      icon: "Target",
    },
  ];

  const dimensions = new Map<string, string>();
  for (const entry of dimensionEntries) {
    const created = await prisma.dimension.create({ data: entry });
    dimensions.set(entry.name, created.id);
  }

  const dim = (name: string) => dimensions.get(name)!;

  const taskData = [
    // Fajr Warrior
    ["Wake up before Fajr and make du'a", "Faith", 3],
    ["Pray Fajr in congregation/masjid", "Faith", 4],
    ["Stay awake after Fajr for dhikr or learning", "Faith", 3],
    ["No phone until after sunrise", "Discipline", 3],

    // Dhikr Engine
    ["Say 100x istighfar", "Remembrance", 3],
    ["Send 100 salawat throughout the day", "Remembrance", 3],
    ["10-minute guided dhikr session", "Remembrance", 3],
    ["Do tasbih after every salah", "Remembrance", 3],

    // Qur’an Connection
    ["Recite Qur’an with translation (1 page)", "Knowledge", 3],
    ["Listen to a Qur’an tafsir clip (10+ min)", "Knowledge", 2],
    ["Memorize one new ayah and reflect", "Knowledge", 4],
    ["Write down 1 lesson from what you read", "Knowledge", 2],

    // Sunnah in Action
    ["Eat/drink with right hand + Bismillah", "Character", 2],
    ["Sleep on your right side with du’as", "Character", 2],
    ["Greet people first + with smile", "Character", 2],
    ["Fast a Monday or Thursday", "Discipline", 5],

    // Nafs Breaker
    ["No social media or YouTube till Maghrib", "Discipline", 4],
    ["Fast from food or sugar for the day", "Discipline", 4],
    ["Delay responding to urges", "Discipline", 3],
    ["Choose discomfort: cold shower/walk/posture work", "Body", 3],

    // Sacred Time
    ["Plan your day after Fajr", "Purpose", 3],
    ["No phone for the first hour", "Discipline", 3],
    ["Block 2 hours for deep, focused work", "Discipline", 3],
    ["Reflect before bed on time usage", "Purpose", 2],

    // Family Ties
    ["Call a relative you haven't spoken to in 1+ month", "Character", 4],
    ["Help a family member without being asked", "Character", 3],
    ["Speak gently during a conflict", "Character", 3],
    ["Say or write a sincere appreciation", "Character", 2],

    // Akhlaq Mastery
    ["Hold back anger in a heated moment", "Character", 4],
    ["Give secret charity", "Character", 4],
    ["Apologize or forgive even if you're right", "Character", 3],
    ["Be radically honest for one day", "Character", 3],

    // Body as Trust
    ["30-minute workout or walk", "Body", 3],
    ["Stretch hips, back, and shoulders before bed", "Body", 2],
    ["Avoid all junk and drink 2L+ water", "Body", 3],
    ["Sleep by 11pm", "Body", 3],

    // Living with Intention
    ["Set 3 intentions at the start of the day", "Purpose", 2],
    ["Write in a gratitude journal", "Purpose", 2],
    ["Review your mission statement", "Purpose", 2],
    ["Make du’a before a major task", "Purpose", 2],
  ];

  const tasks = new Map<string, string>();
  for (const [name, dimension, points] of taskData) {
    const task = await prisma.task.create({
      data: { name, dimensionId: dim(dimension), points },
    });
    tasks.set(name, task.id);
  }

  const challengeEntries = [
    ["Fajr Warrior", "Faith"],
    ["Dhikr Engine", "Remembrance"],
    ["Qur’an Connection", "Knowledge"],
    ["Sunnah in Action", "Character"],
    ["Nafs Breaker", "Discipline"],
    ["Sacred Time", "Discipline"],
    ["Family Ties", "Character"],
    ["Akhlaq Mastery", "Character"],
    ["Body as Trust", "Body"],
    ["Living with Intention", "Purpose"],
  ];

  const challenges = new Map<string, string>();
  for (const [name, _] of challengeEntries) {
    const c = await prisma.challenge.create({
      data: { name, description: "", duration: 3 },
    });
    challenges.set(name, c.id);
  }

  const challengeTasksMap: Record<string, string[]> = {
    "Fajr Warrior": [
      "Wake up before Fajr and make du'a",
      "Pray Fajr in congregation/masjid",
      "Stay awake after Fajr for dhikr or learning",
      "No phone until after sunrise",
    ],
    "Dhikr Engine": [
      "Say 100x istighfar",
      "Send 100 salawat throughout the day",
      "10-minute guided dhikr session",
      "Do tasbih after every salah",
    ],
    "Qur’an Connection": [
      "Recite Qur’an with translation (1 page)",
      "Listen to a Qur’an tafsir clip (10+ min)",
      "Memorize one new ayah and reflect",
      "Write down 1 lesson from what you read",
    ],
    "Sunnah in Action": [
      "Eat/drink with right hand + Bismillah",
      "Sleep on your right side with du’as",
      "Greet people first + with smile",
      "Fast a Monday or Thursday",
    ],
    "Nafs Breaker": [
      "No social media or YouTube till Maghrib",
      "Fast from food or sugar for the day",
      "Delay responding to urges",
      "Choose discomfort: cold shower/walk/posture work",
    ],
    "Sacred Time": [
      "Plan your day after Fajr",
      "No phone for the first hour",
      "Block 2 hours for deep, focused work",
      "Reflect before bed on time usage",
    ],
    "Family Ties": [
      "Call a relative you haven't spoken to in 1+ month",
      "Help a family member without being asked",
      "Speak gently during a conflict",
      "Say or write a sincere appreciation",
    ],
    "Akhlaq Mastery": [
      "Hold back anger in a heated moment",
      "Give secret charity",
      "Apologize or forgive even if you're right",
      "Be radically honest for one day",
    ],
    "Body as Trust": [
      "30-minute workout or walk",
      "Stretch hips, back, and shoulders before bed",
      "Avoid all junk and drink 2L+ water",
      "Sleep by 11pm",
    ],
    "Living with Intention": [
      "Set 3 intentions at the start of the day",
      "Write in a gratitude journal",
      "Review your mission statement",
      "Make du’a before a major task",
    ],
  };

  for (const [challengeName, taskNames] of Object.entries(challengeTasksMap)) {
    const challengeId = challenges.get(challengeName)!;
    for (const taskName of taskNames) {
      await prisma.challengeTask.create({
        data: {
          challengeId,
          taskId: tasks.get(taskName)!,
        },
      });
    }
  }

  console.timeEnd("🌱 Seeding complete");
};

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
