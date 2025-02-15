import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { yogaPoses } from "@/lib/yoga-poses";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function Performances() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const performances = await prisma.poseData.findMany({
    where: { userId: session.user.id },
  });

  const performancesWithPose = performances.map((p) => ({
    ...p,
    poseEntry: yogaPoses.find((yp) => yp.name === p.poseName)!,
  }));

  return (
    <div className="flex flex-col">
      {performancesWithPose.map((p) => (
        <Link href={`/poses/view/${p.id}`} key={p.id}>
          <Card className="p-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">{p.poseEntry.title}</span>
              <span className="text-sm">{p.createdAt.toLocaleString()}</span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function PerformancesSkeleton() {
  return (
    <div className="flex gap-2 flex-col">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  );
}
