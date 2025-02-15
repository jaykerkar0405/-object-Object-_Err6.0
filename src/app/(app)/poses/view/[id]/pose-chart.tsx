"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PoseFeedback } from "@prisma/client";
import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function PoseChart({
  poseFeedbacks,
}: {
  poseFeedbacks: PoseFeedback[];
}) {
  const data = poseFeedbacks.map((p) => ({
    ...p,
    time: p.time - poseFeedbacks[0].time,
  }));

  const [selectedJoint, setSelectedJoint] = useState<string | null>(null);

  const joints = Array.from(new Set(poseFeedbacks.map((p) => p.joint)));
  const filteredData = selectedJoint
    ? data.filter((p) => p.joint === selectedJoint)
    : data;

  return (
    <>
      <Select value={selectedJoint || ""} onValueChange={setSelectedJoint}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select a joint" />
        </SelectTrigger>
        <SelectContent>
          {joints.map((joint) => (
            <SelectItem key={joint} value={joint}>
              {joint.replace("-", " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={filteredData}>
          <XAxis
            dataKey="time"
            tickFormatter={(t) => `${(t / 1000).toFixed(1)}s`}
          />
          <YAxis dataKey="angle" domain={[0, 180]} />
          <Tooltip />
          <Line type="monotone" dataKey="angle" stroke="hsl(var(--primary))" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
