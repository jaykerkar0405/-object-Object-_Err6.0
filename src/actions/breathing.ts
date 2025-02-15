"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function breathing(
  userId: string,
  duration: number,
  breathingPattern: string
) {
  try {
    const breathing = await prisma.breathing.create({
      data: {
        userId,
        duration,
        breathingPattern,
      },
    });

    revalidatePath("/");

    return { success: true, data: breathing };
  } catch (error) {
    console.error("Error creating breathing exercise:", error);
    return { success: false, error: "Failed to save data" };
  }
}
