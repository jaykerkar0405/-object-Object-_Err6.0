"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import useFcmToken from "@/hooks/use-fcm-token";

export default function () {
  const { data: session } = useSession();
  const { token, notificationPermissionStatus } = useFcmToken();

  async function saveToken(userId: string, token: string) {
    try {
      const res = await fetch("/api/fcm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, token }),
      });

      if (!res.ok) {
        console.error("Failed to save token:", res.status);
        return;
      }

      const data = await res.json();
      console.log("Token saved:", data);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  }

  useEffect(() => {
    if (
      token &&
      session?.user.id &&
      notificationPermissionStatus === "granted"
    ) {
      console.log(23)
      alert(23)
    }
  }, [token, notificationPermissionStatus, session]);

  return null;
}
