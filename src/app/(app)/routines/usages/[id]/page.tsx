import { TypographyH1 } from "@/components/typography/H1";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";

export default async function RoutineUsage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await prisma.routineUsage.findFirst({
    where: {
      routineId: id,
    },
    include: {
      routine: true,
      posesData: true,
    },
  });

  console.log(data);
  return (
    <div>
      <TypographyH1>{data?.routine.routineName}</TypographyH1>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Pose Name</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.posesData.map((pose, index) => (
            <TableRow key={index}>
              <TableCell>{pose.poseName}</TableCell>
              <TableCell>{pose.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
