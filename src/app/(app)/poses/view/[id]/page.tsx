import { TypographyH1 } from "@/components/typography/H1";
import { Suspense } from "react";
import { PoseData, PoseDataFallback } from "./pose-data";

export default async function ViewPoseData({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <TypographyH1>View performance</TypographyH1>
      <Suspense fallback={<PoseDataFallback />}>
        <PoseData id={id} />
      </Suspense>
    </>
  );
}
