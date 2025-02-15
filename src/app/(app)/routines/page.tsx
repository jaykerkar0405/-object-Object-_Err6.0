"use client";
import { TypographyH1 } from "@/components/typography/H1";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import yogaPoses from "@/lib/yoga-poses";
import { useState } from "react";

export default function Routines() {
  const [reps, setReps] = useState<number>(1);
  const [duration, setDuration] = useState<number>(0);

  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col gap-4 items-start">
        <TypographyH1>Create Routine</TypographyH1>
        <div className="flex flex-col gap-4 items-start">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a pose" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pose</SelectLabel>
                {yogaPoses.map((yogaPose, index) => (
                  <SelectItem key={index} value={yogaPose.title}>
                    {yogaPose.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            type="number"
            min={1}
            max={100}
            placeholder="Repetitions"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="Enter Duration"
            step={0.5}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
