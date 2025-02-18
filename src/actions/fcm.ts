"use server";

import prisma from "@/lib/prisma";

export async function saveFcmToken(userId: string, fcmToken: string) {
  const existingToken = await prisma.fCMToken.findUnique({
    where: { userId },
  });

  if (existingToken) {
    await prisma.fCMToken.update({
      where: { userId },
      data: { token: fcmToken },
    });
  } else {
    await prisma.fCMToken.create({
      data: {
        userId,
        token: fcmToken,
      },
    });
  }
}
