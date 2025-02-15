"use client";

import { TypographyH1 } from "@/components/typography/H1";
import { yogaPoses } from "@/lib/yoga-poses";
import { redirect, useParams } from "next/navigation";
import { WebcamComponent } from "./webcam-component";

export default function Pose() {
  const { name } = useParams();
  const pose = yogaPoses.find((pose) => pose.name === name);
  if (!pose) redirect("/poses");

  return (
    <>
      <TypographyH1>{pose.title}</TypographyH1>
      <WebcamComponent pose={pose} />
    </>
  );
}
