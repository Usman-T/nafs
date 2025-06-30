"use server";

import { requireAuth } from "@/lib/utils/auth";

export const createExtraTask = async (taskData: {
  taskName: string;
  dimensionId: string;
}) => {
  try {
    const userId = await requireAuth();
  } catch (error) {
    console.error("Error creating extra task:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create task",
    };
  }
};
