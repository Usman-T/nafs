import { PrismaClient } from "@prisma/client";
import predefinedChallenges from "@/lib/predefined";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeding...");

  const dimensionCache = new Map<string, string>();

  for (const challenge of predefinedChallenges) {
    console.log(`🌟 Creating challenge: ${challenge.title}`);

    for (const task of challenge.tasks) {
      if (!dimensionCache.has(task.dimension)) {
        const dimension = await prisma.dimension.upsert({
          where: { name: task.dimension },
          update: {},
          create: {
            name: task.dimension,
            description: `${task.dimension} related tasks`,
            icon: task.icon,
            color: task.color,
          },
        });
        dimensionCache.set(task.dimension, dimension.id);
      }
    }

    const createdChallenge = await prisma.challenge.create({
      data: {
        id: challenge.id,
        name: challenge.title,
        description: challenge.description,
        duration: challenge.duration,
      },
    });

    for (let i = 0; i < challenge.tasks.length; i++) {
      const task = challenge.tasks[i];
      const dimensionId = dimensionCache.get(task.dimension)!;

      const createdTask = await prisma.task.create({
        data: {
          name: task.name,
          dimensionId,
          points: 1,
        },
      });

      await prisma.challengeTask.create({
        data: {
          challengeId: createdChallenge.id,
          taskId: createdTask.id,
          day: i + 1,
        },
      });
    }
  }

  console.log("✅ Seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
