import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PoseChart } from "./pose-chart";

export async function PoseData({ id }: { id: string }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const poseData = await prisma.poseData.findUnique({
    where: { id },
    include: { poseFeedbacks: true },
  });
  if (!poseData) redirect("/poses/view");

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label>Pose</Label>
              <p className="text-xl font-bold">{poseData.poseName}</p>
            </div>
            <div>
              <Label>Duration</Label>
              <p className="text-xl font-bold">{poseData.duration}s</p>
            </div>
            <div>
              <Label>Date</Label>
              <p className="text-xl font-bold">
                {poseData.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feedback Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <PoseChart poseFeedbacks={poseData.poseFeedbacks} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Joint</TableHead>
                <TableHead>Angle</TableHead>
                <TableHead>Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {poseData.poseFeedbacks.map((feedback, i) => (
                <TableRow key={i}>
                  <TableCell>{(feedback.time / 1000).toFixed(1)}s</TableCell>
                  <TableCell>{feedback.joint}</TableCell>
                  <TableCell>{feedback.angle.toFixed(1)}°</TableCell>
                  <TableCell>{feedback.feedback || "Good form"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export function PoseDataFallback() {
  return <Skeleton className="w-full h-px grow" />;
}
