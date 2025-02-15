import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { yogaPoses } from "@/lib/yoga-poses";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function RoutineDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const routineDetails = await prisma.routinePose.findMany({
    where: {
      routineId: id,
    },
    orderBy: {
      poseIndex: "asc",
    },
  });

  const routineData = routineDetails.map((r) => ({
    ...r,
    poseData: yogaPoses.find((p) => p.title === r.poseName)!,
  }));

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Pose Name</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Try</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routineData.map((routine, index) => (
            <TableRow key={index}>
              <TableCell>{routine.poseData.title}</TableCell>
              <TableCell>{routine.duration}</TableCell>
              <TableCell>
                <Link href={`/poses/${routine.poseData.name}`}>
                  <Button variant="secondary">
                    <ChevronRight />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="w-full" asChild>
        <Link href={`/routines/${id}/start`}>Start Routine</Link>
      </Button>
    </div>
  );
}
