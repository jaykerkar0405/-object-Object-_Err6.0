import { TypographyH1 } from "@/components/typography/H1";
import prisma from "@/lib/prisma";
import { RoutineProgress } from "./routine-progress";
import { redirect } from "next/navigation";

export default async function StartRoutine({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const routine = await prisma.routine.findUnique({
    where: { id },
    include: { routinePoses: true },
  });
  if (!routine) redirect("/routines");

  return (
    <>
      <TypographyH1>Start routine</TypographyH1>
      <RoutineProgress routine={routine} />
    </>
  );
}
