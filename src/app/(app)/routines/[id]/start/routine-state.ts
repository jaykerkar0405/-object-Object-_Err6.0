import type { Routine, RoutinePose } from "@prisma/client";
import { create } from "zustand";

interface RoutineProgress {
  currentPoseIndex: number;
  routine: (Routine & { routinePoses: RoutinePose[] }) | null;
  currentPoseStartTime: number;
}

interface RoutineState extends RoutineProgress {
  setRoutine: (routine: Routine & { routinePoses: RoutinePose[] }) => void;
  nextPose: () => void;
  resetRoutine: () => void;
}

export const useRoutineStore = create<RoutineState>((set) => ({
  currentPoseIndex: 0,
  routine: null,
  currentPoseStartTime: 0,

  setRoutine: (routine) => set({ routine }),

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
