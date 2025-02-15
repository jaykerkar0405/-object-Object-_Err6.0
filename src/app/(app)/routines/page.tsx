"use client";

import Image from "next/image";
import { useState } from "react";

import { TypographyH1 } from "@/components/typography/H1";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { yogaPoses } from "@/lib/yoga-poses";

interface YogaPose {
  title: string;
  description: string;
  image: string;
}

interface PoseRoutines {
  pose: YogaPose;
  duration: number;
  reps: number;
}

export default function Routines() {
  const [reps, setReps] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [selectedPose, setSelectedPose] = useState<YogaPose | null>(null);
  const [poses, setPoses] = useState<PoseRoutines[]>([]);

  function addPose(pose: PoseRoutines) {
    setPoses((prevPoses) => [...prevPoses, pose]);
    setReps(0);
    setSelectedPose(null);
    setDuration(0);
  }

  // fix images
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col gap-6 items-start">
        <TypographyH1>Create Routine</TypographyH1>

        <Card className="w-full max-w-md flex-col items-center gap-8 p-4 overflow-hidden">
          <div className="flex gap-4 items-center mb-4">
            {selectedPose ? (
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={selectedPose.image}
                  alt={selectedPose.title}
                  width={150}
                  height={50}
                  className="rounded-lg w-full h-full"
                />
              </div>
            ) : (
              <span className="text-gray-500">No pose selected</span>
            )}

            <CardHeader className="p-0">
              <CardTitle className="text-lg">
                {selectedPose ? selectedPose.title : "Select a pose"}
              </CardTitle>
            </CardHeader>
          </div>

          <div>
            <CardContent className="p-0 text-sm text-gray-600">
              {selectedPose
                ? selectedPose.description
                : "Choose a pose to see details"}
            </CardContent>
          </div>
        </Card>

        <div className="w-full max-w-md">
          <Select
            onValueChange={(value) => {
              const pose = yogaPoses.find((pose) => pose.title === value);
              setSelectedPose(pose || null);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a pose" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pose</SelectLabel>
                {yogaPoses.map((pose) => (
                  <SelectItem key={pose.title} value={pose.title}>
                    {pose.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4 w-full max-w-md">
          <div className="flex gap-4 items-center">
            <Label htmlFor="reps" className="w-24">
              Repetitions
            </Label>
            <Input
              id="reps"
              type="number"
              min={1}
              max={100}
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
              className="flex-1"
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label htmlFor="duration" className="w-24">
              Duration
            </Label>
            <Input
              id="duration"
              type="number"
              step={0.5}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="flex-1"
            />
          </div>
        </div>
        <Button
          onClick={() => {
            if (selectedPose) {
              addPose({ pose: selectedPose, duration, reps });
            }
          }}
        >
          Add Pose
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Pose Name</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Repetitions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {poses.map((pose, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    className="rounded-lg"
                    src={pose.pose.image}
                    width={50}
                    height={50}
                    alt={pose.pose.title}
                  />
                  <p>{pose.pose.title}</p>
                </div>
              </TableCell>
              <TableCell>{pose.duration}</TableCell>
              <TableCell>{pose.reps}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
