"use client";

import { useEffect, useState } from "react";
import { messaging, getToken } from "../lib/firebase";

const useFcmToken = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    async function registerServiceWorker() {
      try {
        if ("serviceWorker" in navigator) {
          const registration = await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js"
          );

          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration,
          });

          if (token) {
            setFcmToken(token);
            console.log("FCM Token:", token);
          } else {
            console.warn("No FCM token received.");
          }
        }
      } catch (error) {
        console.error("Error retrieving FCM token:", error);
      }
    }

    registerServiceWorker();
  }, []);

  return fcmToken;
};

export default useFcmToken;
