"use client";

import Image from "next/image";
import { useState } from "react";

import { TypographyH1 } from "@/components/typography/H1";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { yogaPoses } from "@/lib/yoga-poses";
import { LoaderCircle, PlusCircle, PlusIcon } from "lucide-react";
import { createRoutine } from "../actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";

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
  const [selectedPose, setSelectedPose] = useState<YogaPose | null>(null);
  const [poses, setPoses] = useState<PoseRoutines[]>([]);
  const [creating, setCreating] = useState(false);

  function addPose(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const reps = Number(formData.get("reps"));
    const duration = Number(formData.get("duration"));
    setPoses((prevPoses) => [
      ...prevPoses,
      { duration, reps, pose: selectedPose! },
    ]);
    e.currentTarget.reset();
  }

  async function createHandler() {
    if (poses.length === 0)
      return toast.error("Add at least one pose to create a routine");

    setCreating(true);
    await createRoutine(
      poses.map((pose, index) => ({
        poseName: pose.pose.title,
        duration: pose.duration,
        reps: pose.reps,
        poseIndex: index,
      }))
    );
    toast.success("Routine created successfully");
    setCreating(false);
    redirect("/routines");
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <form onSubmit={addPose} className="flex flex-col gap-6 items-start">
        <TypographyH1>Create Routine</TypographyH1>
        <Card className="w-full">
          <CardHeader className="flex-row items-center gap-4">
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
              <span className="text-muted-foreground">No pose selected</span>
            )}
            <CardTitle className="text-lg">
              {selectedPose ? selectedPose.title : "Select a pose"}
            </CardTitle>
          </CardHeader>

          <CardContent className="-mt-2">
            <p className="text-muted-foreground text-sm pb-2">
              {selectedPose
                ? selectedPose.description
                : "Choose a pose to see details"}
            </p>
            <Select
              required
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
                  {yogaPoses.map((pose) => (
                    <SelectItem key={pose.title} value={pose.title}>
                      {pose.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex flex-col gap-4 w-full max-w-md pt-4">
              <div className="flex gap-4 items-center">
                <Label htmlFor="reps" className="w-24">
                  Repetitions
                </Label>
                <Input
                  name="reps"
                  required
                  type="number"
                  min={1}
                  max={100}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-4 items-center">
                <Label htmlFor="duration" className="w-24">
                  Duration
                </Label>
                <Input
                  name="duration"
                  required
                  type="number"
                  step={0.5}
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="justify-between">
            <Button type="submit" variant="secondary">
              <PlusIcon />
              Add Pose
            </Button>
            <Button type="button" onClick={createHandler} disabled={creating}>
              {creating ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  Create routine <PlusCircle />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Pose name</TableHead>
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
