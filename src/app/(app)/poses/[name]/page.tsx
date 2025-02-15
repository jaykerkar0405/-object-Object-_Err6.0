import { TypographyH1 } from "@/components/typography/H1";

export default function Pose({ params }: { params: { name: string } }) {
  return (
    <div>
      <TypographyH1>{params.name}</TypographyH1>
    </div>
  );
}
