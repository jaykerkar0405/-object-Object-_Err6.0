"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PoseData, PoseFeedback } from "@prisma/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function logRoutine(
  data: (Omit<PoseData, "id" | "userId" | "createdAt" | "routineUsageId"> & {
    poseFeedbacks: Omit<PoseFeedback, "id" | "poseDataId">[];
  })[],
  routineId: string
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const usageId = await prisma.routineUsage.create({ data: { routineId } });
  const posesData = await prisma.poseData.createManyAndReturn({
    data: data.map((p) => ({
      duration: p.duration,
      poseName: p.poseName,
      userId: session.user.id,
    })),
  });

  for (let i = 0; i < posesData.length; i++) {
    const poseData = posesData[i];
    await prisma.poseData.update({
      where: { id: poseData.id },
      data: { routineUsageId: usageId.id },
    });
  }

  for (let i = 0; i < data.length; i++) {
    const poseData = data[i];
    await prisma.poseFeedback.createMany({
      data: poseData.poseFeedbacks.map((f) => ({
        ...f,
        poseDataId: posesData[i].id,
      })),
    });
  }
}
