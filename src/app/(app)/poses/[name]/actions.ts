"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import admin from "firebase-admin";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getFcmTokens } from "@/actions/fcm";
import { PoseFeedback } from "@prisma/client";
import { Message } from "firebase-admin/messaging";

const serviceAccount = process.env.FIREBASE_SERVICE_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_KEY)
  : null;

if (serviceAccount && !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const handleNotification = async (
  token: string,
  title: string,
  message: string
) => {
  const payload: Message = {
    token: token,
    notification: {
      title: title,
      body: message,
    },
  };

  try {
    await admin.messaging().send(payload);
    return JSON.stringify({ success: true, message: "Notification sent!" });
  } catch (error) {
    console.error("FCM Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return JSON.stringify({ success: false, error: errorMessage });
  }
};

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

  const tokens: string[] = (await getFcmTokens(session.user.id)) || [];

  await Promise.all(
    tokens.map((token) =>
      handleNotification(
        token,
        "Pose Completed!",
        `${session.user.name} has completed the "${data.name}" pose successfully! 🎉`
      )
    )
  );

  return pose;
}
