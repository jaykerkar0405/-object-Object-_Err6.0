"use client";

import { Button } from "@/components/ui/button";
import useFcmToken from "@/hooks/use-fcm-token";

export default function Home() {
  const { token, notificationPermissionStatus } = useFcmToken();

  const handleTestNotification = async () => {
    const response = await fetch("/api/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: "c7vkPCyqhsmH-_qDl9IJv0:APA91bF9103VHFdg32bdceQbOYsl7hdzPq_4Ct2gRkdnyIk3SAY0q_VE-yasoyhx-a4tP3SFAf1XpggRruGNJgGToRKV0Ji7gJLLMsm5Dn34sACzxSskYYI",
        title: "Test Notification",
        message: "This is a test notification",
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
