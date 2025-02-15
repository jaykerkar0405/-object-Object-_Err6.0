import Link from "next/link";
import Image from "next/image";
import { IconCloudDemo } from "./Cloud";
import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/typography/P";
import { TypographyH1 } from "@/components/typography/H1";

export default function Root() {
  return (
    <>
      <div className="flex flex-col items-center -mt-10">
        <Image
          src="/favicon.png"
          height={260}
          width={260}
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
    </>
  );
}
