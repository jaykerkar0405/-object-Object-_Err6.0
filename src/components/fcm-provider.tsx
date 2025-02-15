"use client";

import { useEffect } from "react";
import useFcmToken from "@/hooks/use-fcm-token";

export default function FcmProvider() {
  const fcmToken = useFcmToken();

  useEffect(() => {
    if (fcmToken) {
      console.log("FCM Token:", fcmToken);
    }
  }, [fcmToken]);

  return null;
}
