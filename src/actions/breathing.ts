"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function BreathingAction(formData: FormData) {
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user) {
    return {
      message: "No user found",
    };
  }
  const duration = formData.get("duration");
  const breathingPattern = formData.get("breathingPattern") as string;

  try {
    await prisma.breathing.create({
      data: {
        duration: Number(duration),
        breathingPattern: breathingPattern,
        user: {
          connect: {
            id: user.user.id,
          },
        },
      },
    });
    return {
      message: "Successfully created breathing",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
    return {
      message: "Something went wrong",
    };
  }
}
