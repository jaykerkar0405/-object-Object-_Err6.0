"use client";

import { WebcamComponent } from "@/app/(app)/poses/[name]/webcam-component";
import { yogaPoses } from "@/lib/yoga-poses";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { logRoutine } from "./actions";
import { useRoutineStore } from "./routine-state";

export function RoutineProgress({
  routine,
}: {
  routine: Prisma.RoutineGetPayload<{ include: { routinePoses: true } }>;
}) {
  const router = useRouter();
  const routineStore = useRoutineStore();
  const currentPose = routine.routinePoses[routineStore.currentPoseIndex];
  const progress =
    ((routineStore.currentPoseIndex + 1) / routine.routinePoses.length) * 100;

  useEffect(() => {
    if (routineStore.currentPoseIndex >= routine.routinePoses.length) {
      const { unwrap } = toast.promise(
        logRoutine(routineStore.poseData, routine.id),
        {
          success: "Logged routine successfully",
          loading: "Logging routine...",
        }
      );
      unwrap().then(() => {
        routineStore.resetRoutine();
        router.push("/routines");
      });
    }
  }, [
    routineStore.currentPoseIndex,
    routine.routinePoses.length,
    routineStore.poseData,
    routine.id,
    routineStore,
    router,
  ]);

  if (routineStore.currentPoseIndex >= routine.routinePoses.length) {
    return (
      <div className="p-8 rounded-lg shadow-sm border bg-card text-center">
        <h2 className="text-2xl font-bold mb-4">Routine Complete! 🎉</h2>
        <p className="text-muted-foreground">
          Congratulations! You&apos;ve completed all{" "}
          {routine.routinePoses.length} poses.
        </p>
        <div className="h-2 bg-card rounded mt-4">
          <div
            className="h-full bg-primary rounded"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 rounded-lg shadow-sm border bg-card">
        <div className="mb-4">
          <div className="h-2 bg-card rounded">
            <div
              className="h-full bg-primary rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {currentPose && (
          <div>
            <h3 className="font-medium">
              Current Pose: {currentPose.poseName}
            </h3>
            <div className="flex gap-2 text-sm text-muted-foreground">
              <p>
                {routineStore.currentPoseIndex + 1} of{" "}
                {routine.routinePoses.length}
              </p>
            </div>
          </div>
        )}
      </div>

      {currentPose && (
        <WebcamComponent
          key={currentPose.poseName} // Add key prop to force re-render
          pose={yogaPoses.find((p) => p.title === currentPose.poseName)!}
          duration={currentPose.duration}
          isRoutine
        />
      )}
    </>
  );
}
