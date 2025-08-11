import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SHOULD_RESET = process.env.SEED_RESET === "true";

const main = async () => {
  console.time("🌱 Starting to seed.");
  if (SHOULD_RESET) {
    console.warn("⚠️  Skipping seed: SEED_RESET env var not set to 'true'");
    await prisma.$transaction([
      prisma.challengeTask.deleteMany(),
      prisma.dailyTask.deleteMany(),
      prisma.task.deleteMany(),
      prisma.challenge.deleteMany(),
      prisma.dimension.deleteMany(),
      prisma.user.deleteMany(),
      prisma.account.deleteMany(),
      prisma.session.deleteMany(),
      prisma.dimensionValue.deleteMany(),
      prisma.completedTask.deleteMany(),
      prisma.savedAyah.deleteMany(),
      prisma.reflection.deleteMany(),
    ]);

    return;
  }

  const dimensionEntries = [
    {
      name: "Faith",
      description: "Iman in practice - Salah, sincerity, intentions, tawakkul",
      color: "#00FFF7",
      icon: "Sparkles",
    },
    {
      name: "Remembrance",
      description:
        "Inner connection to Allah - Dhikr, du'a, istighfar, presence",
      color: "#FF6EC7",
      icon: "Brain",
    },
    {
      name: "Knowledge",
      description:
        "Learning for the soul - Quran, Hadith, Islamic studies, reflection",
      color: "#FFD300",
      icon: "BookOpen",
    },
    {
      name: "Character",
      description:
        "The Sunnah in action - Manners, patience, honesty, humility",
      color: "#39FF14",
      icon: "HeartHandshake",
    },
    {
      name: "Discipline",
      description:
        "Mastering the self - Fajr wake-ups, fasting, time management, resisting the nafs",
      color: "#FF073A",
      icon: "AlarmClock",
    },
    {
      name: "Body",
      description:
        "The amana of your health - Sleep, exercise, energy, nutrition",
      color: "#00BFFF",
      icon: "Dumbbell",
    },
    {
      name: "Purpose",
      description:
        "Ambition for the akhirah & dunya - Meaningful goals with divine intention",
      color: "#B026FF",
      icon: "Target",
    },
  ];

  const dimensions = new Map<string, string>();
  for (const entry of dimensionEntries) {
    const created = await prisma.dimension.create({ data: entry });
    dimensions.set(entry.name, created.id);
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
