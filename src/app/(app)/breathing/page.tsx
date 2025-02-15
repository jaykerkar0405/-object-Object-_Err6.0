"use client";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import Image from "next/image";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { BreathingAction } from "@/actions/breathing";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

type BreathingPhase =
  | "Inhale"
  | "Hold"
  | "Exhale"
  | "Inhale deeply"
  | "Exhale slowly";

type BreathingPatternKey = "478" | "box" | "diaphragmatic";

interface BreathingStep {
  duration: number;
  phase: BreathingPhase;
}

const breathingPatterns: Record<BreathingPatternKey, BreathingStep[]> = {
  "478": [
    { phase: "Inhale", duration: 4000 },
    { phase: "Hold", duration: 7000 },
    { phase: "Exhale", duration: 8000 },
  ],
  box: [
    { phase: "Inhale", duration: 4000 },
    { phase: "Hold", duration: 4000 },
    { phase: "Exhale", duration: 4000 },
    { phase: "Hold", duration: 4000 },
  ],
  diaphragmatic: [
    { phase: "Inhale deeply", duration: 4000 },
    { phase: "Exhale slowly", duration: 6000 },
  ],
};

export default function Breathing() {
  const [breathingPhase, setBreathingPhase] =
    useState<BreathingPhase>("Inhale");
  const [breathingPattern, setBreathingPattern] =
    useState<BreathingPatternKey>("478");
  const [duration, setDuration] = useState<number>(5);
  const [animationDuration, setAnimationDuration] = useState<number>(4);
  const [isExerciseStarted, setIsExerciseStarted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/ambient-music.mp3");
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Audio playback failed:", error);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const startExercise = () => {
    setIsExerciseStarted(true);
    isRunningRef.current = true;
    setTimeRemaining(duration * 60);

    countdownRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          stopExercise();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    let phaseIndex = 0;
    const pattern = breathingPatterns[breathingPattern];

    const runPhase = () => {
      if (!isRunningRef.current) return;

      const currentPhase = pattern[phaseIndex];
      setBreathingPhase(currentPhase.phase);
      setAnimationDuration(currentPhase.duration / 1000);

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        phaseIndex = (phaseIndex + 1) % pattern.length;
        runPhase();
      }, currentPhase.duration);
    };

    runPhase();
  };

  const stopExercise = async () => {
    isRunningRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }

    setIsExerciseStarted(false);
    setBreathingPhase("Inhale");
    setTimeRemaining(0);

    const formData = new FormData();
    formData.append("duration", duration.toString());
    formData.append("breathingPattern", breathingPattern);

    const response = await BreathingAction(formData);
    console.log(response);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  const getScale = (phase: BreathingPhase) => {
    switch (phase) {
      case "Inhale":
        return 2.25;
      case "Hold":
        return 2.25;
      case "Exhale":
        return 1.25;
      case "Inhale deeply":
        return 2.75;
      case "Exhale slowly":
        return 1.25;
      default:
        return 1.0;
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-6">Breathing Exercise</h1>

      {!isExerciseStarted ? (
        <div className="space-y-6">
          <div>
            <label
              htmlFor="breathing-pattern"
              className="block text-sm font-medium mb-2"
            >
              Breathing Pattern
            </label>
            <Select
              value={breathingPattern}
              onValueChange={(value) =>
                setBreathingPattern(value as BreathingPatternKey)
              }
            >
              <SelectTrigger id="breathing-pattern">
                <SelectValue placeholder="Select a breathing pattern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="478">4-7-8 Breathing</SelectItem>
                <SelectItem value="box">Box Breathing (4-4-4-4)</SelectItem>
                <SelectItem value="diaphragmatic">
                  Diaphragmatic Breathing
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium mb-2"
            >
              Session Duration (minutes): {duration}
            </label>
            <Slider
              min={1}
              max={20}
              step={1}
              id="duration"
              value={[duration]}
              onValueChange={(value) => setDuration(value[0])}
            />
          </div>

          <Button onClick={startExercise}>Start Breathing</Button>
        </div>
      ) : (
        <Card className="w-full max-w-md mx-auto shadow-lg border border-gray-200 dark:border-gray-800 bg-background">
          <CardContent className="flex flex-col items-center gap-6 py-6">
            <div className="text-2xl font-mono font-semibold bg-secondary/20 px-4 py-2 rounded-lg">
              {formatTime(timeRemaining)}
            </div>

            <div className="relative" style={{ zIndex: 1 }}>
              <motion.div
                className="flex justify-center items-center w-48 h-48"
                animate={{
                  rotate: [0, 360],
                  scale: getScale(breathingPhase),
                }}
                transition={{
                  scale: { duration: animationDuration, ease: "easeInOut" },
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                }}
              >
                <Image
                  width={128}
                  height={128}
                  alt="Breathing"
                  src="/breathing.png"
                  className="object-contain drop-shadow-md"
                />
              </motion.div>
            </div>

            <p className="text-2xl font-semibold text-center capitalize">
              {breathingPhase}
            </p>

            <div className="flex gap-4">
              <Button onClick={toggleMusic}>
                {isPlaying ? (
                  <Pause className="h-4 w-4 mr-2" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                <span>{isPlaying ? "Pause Music" : "Play Music"}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
