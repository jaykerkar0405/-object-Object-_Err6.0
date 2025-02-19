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

export async function getFcmTokens(excludeUserId: string) {
  try {
    const tokens = await prisma.fCMToken.findMany({
      where: {
        userId: {
          not: excludeUserId,
        },
      },
      select: {
        token: true,
      },
    });

    return tokens.map((token) => token.token);
  } catch (error) {
    console.error("Error fetching FCM tokens:", error);
    throw new Error("Failed to fetch FCM tokens");
  }
}
