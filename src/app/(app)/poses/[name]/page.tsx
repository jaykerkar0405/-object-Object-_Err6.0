import { TypographyH1 } from "@/components/typography/H1";
import yogaPoses from "@/lib/yoga-poses";
import { redirect } from "next/navigation";
import { WebcamComponent } from "./webcam-component";

export default async function Pose({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const pose = yogaPoses.find((pose) => pose.name === name);
  if (!pose) redirect("/poses");

  return (
    <>
      <TypographyH1>{pose.title}</TypographyH1>
      <WebcamComponent />
    </>
  );
}
