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
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Pose Name</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Reps</TableHead>
            <TableHead>View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routineDetails.map((routine, index) => (
            <TableRow key={index}>
              <TableCell>{routine.poseName}</TableCell>
              <TableCell>{routine.duration}</TableCell>
              <TableCell>{routine.reps}</TableCell>
              <TableCell>
                <Link href={`/poses/${routine.poseName}`}>
                  <Button>view</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="w-full">Start Routine</Button>
    </div>
  );
}
