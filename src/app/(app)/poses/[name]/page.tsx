"use client";

import { TypographyH1 } from "@/components/typography/H1";
import { yogaPoses } from "@/lib/yoga-poses";
import { redirect, useParams } from "next/navigation";
import { DurationWrapper } from "./duration-wrapper";

export default function Pose() {
  const { name } = useParams();
  const pose = yogaPoses.find((pose) => pose.name === name);
  if (!pose) redirect("/poses");

  return (
    <>
      <TypographyH1>{pose.title}</TypographyH1>
      <DurationWrapper pose={pose} />
    </>
  );
}
