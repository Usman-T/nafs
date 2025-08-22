"use server"

import { auth } from "@/auth";
import prisma from "@/prisma";
import { revalidatePath } from "next/cache";

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

    if (session?.user) {
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
