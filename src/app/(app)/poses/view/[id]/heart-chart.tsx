"use client";
import { HeartRate } from "@prisma/client";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function HeartChart({ heartRates }: { heartRates: HeartRate[] }) {
  return (
    <>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={heartRates}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(t) =>
              new Date(t).toLocaleTimeString(undefined, { timeStyle: "short" })
            }
          />
          <YAxis dataKey="angle" domain={[0, 180]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="heartRate"
            stroke="hsl(var(--destructive))"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
