import { NextResponse } from "next/server";
import prisma from "@/prisma";

export const GET = async () => {
  try {
    await prisma.task.createMany({
      data: [
        {
          name: "Salah",
          dimensionId: "cmahuy6a20004gdigbvuegkdv",
        },
        {
          name: "Walk",
          dimensionId: "cmahuy6a00003gdig1nkohqd0",
        },
        {
          name: "Task 3",
          dimensionId: "cmahuy6a20004gdigbvuegkdv",
        },
        {
          name: "Task 4",
          dimensionId: "cmahuy6a00002gdig7wbqanm2",
        },
      ],
    });

    // Get the actual task records with their IDs
    const tasks = await prisma.task.findMany({
      where: {
        name: {
          in: ["Salah", "Walk", "Task 3", "Task 4"],
        },
      },
    });

    const challenge = await prisma.challenge.create({
      data: {
        name: "Test Challenge",
        description: "This is a test challenge",
        duration: 3,
      },
    });

    const challengeTasks = await prisma.challengeTask.createMany({
      data: tasks.map((task) => ({
        challengeId: challenge.id,
        taskId: task.id,
      })),
    });

    return NextResponse.json({
      challenge,
      tasks,
      challengeTasks,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create challenge" },
      { status: 500 }
    );
  }
};
