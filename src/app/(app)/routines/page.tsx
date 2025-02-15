import { TypographyH1 } from "@/components/typography/H1";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function RoutinesPage() {
  const routines = await prisma.routine.findMany();
  return (
    <div className="container py-4 flex-col">
      <div className="mb-4">
        <TypographyH1>Routines</TypographyH1>
      </div>
      <div className="flex flex-col items-start gap-4 w-full">
        <div className="flex flex-col gap-4 w-full">
          {routines.map((routine, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{routine.routineName}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href={`/routines/${routine.id}`}>
                  <Button variant="secondary">View Routine</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Button asChild className="w-full mt-4">
        <Link href="/routines/create">
          Create <PlusIcon />
        </Link>
      </Button>
    </div>
  );
}
