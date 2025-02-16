"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PoseFeedback } from "@prisma/client";

const handleNotification = async (
  token: string,
  title: string,
  message: string
) => {
  try {
    const response = await fetch("/api/send-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, title, message }),
    });

    const data = await response.json();
    console.log("Notification Response:", data);
  } catch (error) {
    console.error("Error sending notification:", error);
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

  const tokens: string[] = [
    "c7vkPCyqhsmH-_qDl9IJv0:APA91bF9103VHFdg32bdceQbOYsl7hdzPq_4Ct2gRkdnyIk3SAY0q_VE-yasoyhx-a4tP3SFAf1XpggRruGNJgGToRKV0Ji7gJLLMsm5Dn34s",
    "dvZO1lKPoOrkegfl2ipVxd:APA91bHH6pN4ZdSFjClgja2mVTTzBAmhLrJ1ci_phlVnH9RE1upOrO6Fvkcz8OmM6rcveeF1q1JSURleQOvdtP5JdMERt_q17U1JIc8mqFQ2mZHvjR3IB0M",
    "f8X2CodCPH4fZBT_FmhnR3:APA91bErcBzmZ-OGpdR4yLJR0_7gQK0XVonsXENq3MV_L1D_Mzhmiq5eF8w_0PumHynFM2ARcpTEmYEu4NDWA75PvQAdRjYmBQ3qM4kPipz-MY789GjZFQ8",
  ];

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
