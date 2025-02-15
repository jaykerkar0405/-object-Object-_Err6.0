"use client";

import {
  useInstallationPromptStore,
  useLastCheckedForUpdateStore,
  useUpdateAvailableStore,
} from "@/hooks/use-sw-state";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { ResponsiveDialog } from "./responsive-dialog";
import { Button } from "./ui/button";

export function SwEventsHandler() {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  const setDeferredPrompt = useInstallationPromptStore(
    (state) => state.setDeferredPrompt
  );
  const setLastChecked = useLastCheckedForUpdateStore(
    (state) => state.setLastChecked
  );
  const [updateDialogOpen, setUpdateDialogOpen, skipWaiting, setSkipWaiting] =
    useUpdateAvailableStore(
      useShallow((state) => [
        state.updateDialogOpen,
        state.setUpdateDialogOpen,
        state.skipWaiting,
        state.setSkipWaiting,
      ])
    );

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    if (!("serviceWorker" in navigator)) return;

    import("@serwist/window").then(({ Serwist }) => {
      const sw = new Serwist("/sw.js", { scope: "/", type: "classic" });
      sw.register();

      const checkForUpdate = () => {
        try {
          setLastChecked(new Date());
          sw.update();
        } catch (error) {
          console.error(error);
        }
      };
      checkForUpdate();
      const updateInterval = setInterval(checkForUpdate, 1000 * 60 * 60);

      sw.addEventListener("waiting", () => {
        setSkipWaiting(() => sw.messageSkipWaiting());
      });

      sw.addEventListener("controlling", (event) => {
        if (event.isUpdate || event.isExternal) {
          localStorage.clear();
          router.refresh();
        }
      });

      return () => {
        clearInterval(updateInterval);
      };
    });
  }, [router, setSkipWaiting, setLastChecked]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const installHandler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", installHandler);

    const installedHandler = () => {
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", installHandler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, [setDeferredPrompt]);

  return (
    <>
      <ResponsiveDialog
        title="Update available 🎉"
        description="Any unsaved data, like a workout in progress, will be lost. Are you sure you want to update?"
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
      >
        <Button
          className="w-full"
          disabled={updating}
          onClick={() => {
            setUpdating(true);
            skipWaiting!();
          }}
        >
          {updating ? (
            <>
              Updating <LoaderCircle className="animate-spin" />
            </>
          ) : (
            "Update"
          )}
        </Button>
      </ResponsiveDialog>
    </>
  );
}
