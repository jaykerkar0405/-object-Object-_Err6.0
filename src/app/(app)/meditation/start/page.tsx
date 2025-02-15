"use client";
import React, { useState, useRef } from "react";
import Clock from "./clock";
import { TypographyH1 } from "@/components/typography/H1";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function StartMeditation() {
  const [duration, setDuration] = useState(0);
  const clockRef = useRef(null);

  const handleStart = () => {
    if (clockRef.current) {
      clockRef.current.startTimer();
    }
  };

  const handleStop = () => {
    if (clockRef.current) {
      clockRef.current.stopTimer();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <TypographyH1>Start Meditation</TypographyH1>

      <div className="flex flex-col gap-2">
        <label htmlFor="duration">Duration (minutes)</label>
        <Input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          placeholder="Enter duration (minutes)"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleStart} className="flex-1">
          Start
        </Button>
        <Button onClick={handleStop} variant="outline" className="flex-1">
          Stop
        </Button>
      </div>

      <div className="mx-auto mt-4">
        <Clock ref={clockRef} title="Meditation Timer" duration={duration} />
      </div>
    </div>
  );
}
