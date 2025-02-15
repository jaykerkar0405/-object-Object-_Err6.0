import Link from "next/link";
import Image from "next/image";
import { IconCloudDemo } from "./Cloud";
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
          <button className="px-8 py-2 rounded-full bg-gradient-to-b from-[hsl(32,33%,71%)] to-[hsl(32,33%,61%)] text-white focus:ring-2 focus:ring-[hsl(32,33%,71%)] hover:shadow-xl transition duration-200 font-bold">
            Get Started
          </button>
        </Link>
      </div>
    </>
  );
}
