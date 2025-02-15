"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createRoutine(
  data: {
    poseIndex: number;
    poseName: string;
    duration: number;
    reps: number;
  }[]
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  await prisma.routine.create({
    data: {
      userId: session.user.id,
      routinePoses: { createMany: { data } },
    },
  });
}
