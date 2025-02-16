import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

const serviceAccount = JSON.parse(String(process.env.FIREBASE_SERVICE_KEY));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request: NextRequest) {
  const { token, title, message } = await request.json();

  const payload: Message = {
    token,
    notification: {
      title: title,
      body: message,
    },
  };

  try {
    await admin.messaging().send(payload);
    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
