import { TypographyH1 } from "@/components/typography/H1";
import { TypographyP } from "@/components/typography/P";
import Image from "next/image";
import { IconCloudDemo } from "./Cloud";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Component() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/favicon.png"
        height={300}
        width={300}
        alt="YogaSense Icon"
        className="mx-auto"
      />
      <div className="text-center">
        <TypographyH1>YogaSense</TypographyH1>
      </div>
      <br />
      <div className="text-center">
        <TypographyP>AI Based Yoga Assistant</TypographyP>
      </div>
      <IconCloudDemo />
      <Link href="/dashboard">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}
