import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const challengeId = request.nextUrl.pathname.split("/").pop() as string;
  try {
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
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

    return NextResponse.json({ challenge });
  } catch (error) {
    console.error("Error fetching challenge:", error);
    return NextResponse.json(
      { error: "Error fetching challenge" },
      { status: 500 }
    );
  }
};
