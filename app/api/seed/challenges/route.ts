import { NextResponse } from "next/server";
import prisma from "@/prisma";

export const GET = async () => {
  try {
    await prisma.challengeTask.deleteMany();
    await prisma.task.deleteMany();
    await prisma.challenge.deleteMany();

    await prisma.task.createMany({
      data: [
        {
          name: "Pray Fajr on time",
          dimensionId: "cmaj7v6pn0000jv0skzwkvlf4",
          points: 3,
        },
        {
          name: "No social media till Dhuhr",
          dimensionId: "cmaj7v6pn0000jv0skzwkvlf4",
          points: 2,
        },
        {
          name: "Fast Sunnah day",
          dimensionId: "cmaj7v6pn0000jv0skzwkvlf4",
          points: 3,
        },

        {
          name: "Morning/evening adhkar",
          dimensionId: "cmaj7v6pt0001jv0svpuk0qrx",
          points: 2,
        },
        {
          name: "Istighfar 100x",
          dimensionId: "cmaj7v6pt0001jv0svpuk0qrx",
          points: 3,
        },

        {
          name: "Walk 30 mins",
          dimensionId: "cmaj7v6q10004jv0sko65qau0",
          points: 2,
        },
        {
          name: "Workout 20 mins",
          dimensionId: "cmaj7v6q10004jv0sko65qau0",
          points: 3,
        },

        {
          name: "Read Quran + translation",
          dimensionId: "cmaj7v6px0003jv0satiehs0u",
          points: 3,
        },
        {
          name: "Learn 1 hadith",
          dimensionId: "cmaj7v6px0003jv0satiehs0u",
          points: 2,
        },
        {
          name: "Listen Islamic podcast",
          dimensionId: "cmaj7v6px0003jv0satiehs0u",
          points: 2,
        },

        {
          name: "Give secret charity",
          dimensionId: "cmaj7v6q50005jv0s5nr0aomg",
          points: 3,
        },
        {
          name: "Call family member",
          dimensionId: "cmaj7v6q50005jv0s5nr0aomg",
          points: 2,
        },
        {
          name: "Smile at 3 people",
          dimensionId: "cmaj7v6q50005jv0s5nr0aomg",
          points: 1,
        },

        {
          name: "Pray Tahajjud",
          dimensionId: "cmaj7v6q50006jv0sk6iwtmz1",
          points: 4,
        },

        {
          name: "Set daily intention",
          dimensionId: "cmaj7v6pw0002jv0sck3pshp0",
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
          name: "Daily Sunnah Challenge",
          description: "Simple acts to follow the Prophet's example",
          duration: 5,
        },
        {
          name: "Heart Cleanse Week",
          description: "Purify your heart through focused worship",
          duration: 7,
        },
        {
          name: "Balanced Muslim Week",
          description: "Grow in all dimensions of faith",
          duration: 5,
        },
      ],
    });

    const challenges = await prisma.challenge.findMany();

    await prisma.challengeTask.createMany({
      data: [
        {
          challengeId: challenges[0].id,
          taskId: getTaskId("Pray Fajr on time"),
        },
        {
          challengeId: challenges[0].id,
          taskId: getTaskId("Read Quran + translation"),
        },
        { challengeId: challenges[0].id, taskId: getTaskId("Walk 30 mins") },
        {
          challengeId: challenges[0].id,
          taskId: getTaskId("Give secret charity"),
        },
        {
          challengeId: challenges[0].id,
          taskId: getTaskId("Morning/evening adhkar"),
        },

        { challengeId: challenges[1].id, taskId: getTaskId("Pray Tahajjud") },
        {
          challengeId: challenges[1].id,
          taskId: getTaskId("No social media till Dhuhr"),
        },
        { challengeId: challenges[1].id, taskId: getTaskId("Istighfar 100x") },
        {
          challengeId: challenges[1].id,
          taskId: getTaskId("Call family member"),
        },
        { challengeId: challenges[1].id, taskId: getTaskId("Learn 1 hadith") },

        { challengeId: challenges[2].id, taskId: getTaskId("Fast Sunnah day") },
        {
          challengeId: challenges[2].id,
          taskId: getTaskId("Listen Islamic podcast"),
        },
        { challengeId: challenges[2].id, taskId: getTaskId("Workout 20 mins") },
        {
          challengeId: challenges[2].id,
          taskId: getTaskId("Smile at 3 people"),
        },
        {
          challengeId: challenges[2].id,
          taskId: getTaskId("Set daily intention"),
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Successfully seeded 3 challenges with balanced tasks",
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { error: "Database seeding failed" },
      { status: 500 }
    );
  }
};
