"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getHeartrate() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  return await prisma.heartRate.findFirst({
    where: {
      userId: session.user.id,
      timestamp: {
        gte: new Date(Date.now() - 10000),
      },
    },
    orderBy: { timestamp: "desc" },
  });
}
