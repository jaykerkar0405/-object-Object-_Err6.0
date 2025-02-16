"use client";

import { Button } from "@/components/ui/button";
import useFcmToken from "@/hooks/use-fcm-token";

export default function Home() {
  const { token, notificationPermissionStatus } = useFcmToken();

  const handleNotification = async (
    token: string,
    title: string,
    message: string
  ) => {
    const response = await fetch("/api/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        title: title,
        message: message,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <main className="p-10">
      <h1 className="text-4xl mb-4 font-bold">Firebase Cloud Messaging Demo</h1>

      {notificationPermissionStatus === "granted" ? (
        <p>{token}</p>
      ) : notificationPermissionStatus !== null ? (
        <p>
          You have not granted permission to receive notifications. Please
          enable notifications in your browser settings.
        </p>
      ) : null}

      <Button
        disabled={!token}
        className="mt-5"
        onClick={handleTestNotification}
      >
        Send Test Notification
      </Button>
    </main>
  );
}
