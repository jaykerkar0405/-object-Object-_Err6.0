"use client";

import { Prisma } from "@prisma/client";
import { useRoutineStore } from "./routine-state";
import { yogaPoses } from "@/lib/yoga-poses";
import { WebcamComponent } from "@/app/(app)/poses/[name]/webcam-component";
import { useEffect } from "react";

export function RoutineProgress({
  routine,
}: {
  routine: Prisma.RoutineGetPayload<{ include: { routinePoses: true } }>;
}) {
  const routineStore = useRoutineStore();
  const currentPose = routine.routinePoses[routineStore.currentPoseIndex];
  const progress =
    ((routineStore.currentPoseIndex + 1) / routine.routinePoses.length) * 100;

  useEffect(() => {
    if (routineStore.currentPoseIndex >= routine.routinePoses.length) {
      console.log("Routine completed!");
    }
  }, [routineStore.currentPoseIndex, routine.routinePoses.length]);

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
          pose={yogaPoses.find((p) => p.name === currentPose.poseName)!}
          duration={currentPose.duration}
          isRoutine
        />
      )}
    </>
  );
}
