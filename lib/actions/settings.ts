"use server";

import { auth } from "@/auth";
import prisma from "@/prisma";
import { revalidatePath } from "next/cache";
import { P } from "pino";
import { StringValidation } from "zod";

export const updateGeneralSettings = async ({
  emailNotifications,
  analyticsEnabled,
  personalizationEnabled,
}: {
  emailNotifications: boolean;
  analyticsEnabled: boolean;
  personalizationEnabled: boolean;
}) => {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Authentication failed");
    }

    const updatedUser = await prisma.userSettings.update({
      where: { userId: session?.user?.id },
      data: {
        emailNotifications,
        analyticsEnabled,
        personalizationEnabled,
      },
    });
    revalidatePath("/dashboard/settings");

    return { success: true, user: updatedUser };
  } catch (error) {
    console.log(error);

    return { success: false, error: error?.message || "An error occured" };
  }
};

export const updateAccountSettings = async ({
  username,
  email,
  currentPassword,
  newPassword,
}: {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Authentication failed");
    }

    const updatedUser = await prisma.user.update({
      where: { id: session?.user?.id },
      data: {
        name: username,
        email: email,
      },
    });
    revalidatePath("/dashboard/settings");

    return { success: true, user: updatedUser };
  } catch (error) {
    console.log(error);
    return { success: false, error: error?.message || "An error occured" };
  }
};

export const deleteAccount = async () => {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = session.user.id; 

    await prisma.$transaction(async (tx) => {
      await tx.userAchievement.deleteMany({
        where: { userId }
      });

      await tx.userChallenge.deleteMany({
        where: { userId }
      });

      await tx.completedTask.deleteMany({
        where: { userId }
      });

      await tx.dailyTask.deleteMany({
        where: { userId }
      });

      await tx.dimensionValue.deleteMany({
        where: { userId }
      });

      await tx.extraTask.deleteMany({
        where: { userId }
      });

      await tx.reading.deleteMany({
        where: { userId }
      });

      await tx.reflection.deleteMany({
        where: { userId }
      });

      await tx.savedAyah.deleteMany({
        where: { userId }
      });

      await tx.userSettings.deleteMany({
        where: { userId }
      });

      await tx.session.deleteMany({
        where: { userId }
      });

      await tx.account.deleteMany({
        where: { userId }
      });

      await tx.user.delete({
        where: { id: userId }
      });
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to delete account" 
    };
  }
};