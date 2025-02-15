"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { YogaPose } from "@/lib/yoga-poses";
import { useState } from "react";
import { toast } from "sonner";
import { WebcamComponent } from "./webcam-component";
import { Button } from "@/components/ui/button";

export function DurationWrapper({ pose }: { pose: YogaPose }) {
  const [duration, setDuration] = useState("");
  const [start, setStart] = useState(false);
  const durationAsNumber = Number(duration);

  return (
    <>
      {!start && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (durationAsNumber <= 0) {
              toast.error("Invalid duration", {
                description: "Duration must be greater than 0 seconds",
              });
              return;
            }
            setStart(true);
          }}
        >
          <Card className="p-4">
            <div className="grid w-full items-center gap-4">
              <Label htmlFor="duration">Duration (seconds)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter duration"
              />
              <Button type="submit" className="w-full">
                Start
              </Button>
            </div>
          </Card>
        </form>
      )}
      {start && <WebcamComponent pose={pose} duration={durationAsNumber} />}
    </>
  );
}
