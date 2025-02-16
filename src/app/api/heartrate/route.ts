import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    heartRate: number;
    timestamp: EpochTimeStamp;
    userId: string;
  };

  await prisma.heartRate.create({
    data: {
      user: { connect: { email: body.userId } },
      heartRate: body.heartRate,
      timestamp: new Date(body.timestamp),
    },
  });

  return new Response("Data added successfully", { status: 200 });
}
