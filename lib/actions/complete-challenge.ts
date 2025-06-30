"use server";

import prisma from "@/prisma";
import { requireAuth } from "../auth";

export const completeChallenge = async (challengeId: string) => {
  try {
    const userId = await requireAuth();

    await prisma.$transaction([
      prisma.userChallenge.updateMany({
        where: { userId, challengeId },
        data: { completed: true, progress: 100 },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { challengeId: null, level: { increment: 1 } },
      }),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Error completing challenge:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to complete challenge",
    };
  }
};
