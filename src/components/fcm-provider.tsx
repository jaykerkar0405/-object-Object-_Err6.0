"use client";

import { useEffect } from "react";
import { saveFcmToken } from "@/actions/fcm";
import { useSession } from "@/lib/auth-client";
import useFcmToken from "@/hooks/use-fcm-token";

export default function FcmProvider() {
  const { data: session } = useSession();
  const { token, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    const handleFcmTokenSave = async () => {
      if (
        token &&
        session?.user.id &&
        notificationPermissionStatus === "granted"
      ) {
        await saveFcmToken(session.user.id, token);
      }
    };

    handleFcmTokenSave();
  }, [token, notificationPermissionStatus, session]);

  return null;
}
