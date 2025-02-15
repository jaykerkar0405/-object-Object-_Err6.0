import { TypographyH1 } from "@/components/typography/H1";
import { Suspense } from "react";
import { Performances, PerformancesSkeleton } from "./performances";

export default function ViewPerformancesPage() {
  return (
    <>
      <TypographyH1>View performances</TypographyH1>
      <Suspense fallback={<PerformancesSkeleton />}>
        <Performances />
      </Suspense>
    </>
  );
}
