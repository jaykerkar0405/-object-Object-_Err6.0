"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PoseFeedback } from "@prisma/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createPoseData(data: {
  name: string;
  duration: number;
  feedbacks: Omit<PoseFeedback, "id" | "poseDataId">[];
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const pose = await prisma.poseData.create({
    data: {
      poseName: data.name,
      userId: session.user.id,
      duration: data.duration,
      poseFeedbacks: {
        createMany: { data: data.feedbacks },
      },
    },
  });

  return pose;
}
