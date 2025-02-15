import type {
  PoseData,
  PoseFeedback,
  Routine,
  RoutinePose,
} from "@prisma/client";
import { create } from "zustand";

interface RoutineProgress {
  currentPoseIndex: number;
  routine: (Routine & { routinePoses: RoutinePose[] }) | null;
  currentPoseStartTime: number;
  poseData: (Omit<
    PoseData,
    "id" | "userId" | "createdAt" | "routineUsageId"
  > & {
    poseFeedbacks: Omit<PoseFeedback, "id" | "poseDataId">[];
  })[];
}

interface RoutineState extends RoutineProgress {
  setRoutine: (routine: Routine & { routinePoses: RoutinePose[] }) => void;
  nextPose: () => void;
  resetRoutine: () => void;
  addPoseData: (
    newPoseData: Omit<
      PoseData,
      "id" | "userId" | "createdAt" | "routineUsageId"
    > & {
      poseFeedbacks: Omit<PoseFeedback, "id" | "poseDataId">[];
    }
  ) => void;
  startRoutine: () => void;
}

export const useRoutineStore = create<RoutineState>((set) => ({
  currentPoseIndex: 0,
  routine: null,
  currentPoseStartTime: 0,
  poseData: [],

  setRoutine: (routine) => set({ routine }),

  addPoseData: (
    newPoseData: Omit<
      PoseData,
      "id" | "userId" | "createdAt" | "routineUsageId"
    > & {
      poseFeedbacks: Omit<PoseFeedback, "id" | "poseDataId">[];
    }
  ) =>
    set((state) => ({
      poseData: [...state.poseData, newPoseData],
    })),

  startRoutine: () =>
    set({
      currentPoseStartTime: Date.now(),
    }),

  nextPose: () => {
    set((state) => ({
      currentPoseIndex: state.currentPoseIndex + 1,
      currentPoseStartTime: Date.now(),
    }));
  },

  resetRoutine: () =>
    set({
      currentPoseIndex: 0,
      currentPoseStartTime: 0,
    }),
}));
