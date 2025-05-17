import { NextResponse } from "next/server";
import prisma from "@/prisma";

export const GET = async () => {
  try {
    // Clear existing data
    await prisma.challengeTask.deleteMany();
    await prisma.task.deleteMany();
    await prisma.challenge.deleteMany();

    const dimensions = await prisma.dimension.findMany();
    
    const getDimensionId = (name: string) => 
      dimensions.find(d => d.name === name)?.id || "";

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
        }
      ],
    });

    const tasks = await prisma.task.findMany();

    const getTaskId = (name: string) =>
      tasks.find((t) => t.name === name)?.id || "";

    // Create improved 3-day challenges
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

    // Assign tasks to challenges
    await prisma.challengeTask.createMany({
      data: [
        // Spiritual Reset Challenge
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
        }
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Successfully seeded 3 improved 3-day challenges",
      data: {
        challenges: challenges.length,
        tasks: tasks.length,
        challengeTasks: await prisma.challengeTask.count()
      }
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { 
        error: "Database seeding failed",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
};