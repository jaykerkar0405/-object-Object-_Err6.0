import { TypographyH1 } from "@/components/typography/H1";
import { TypographyP } from "@/components/typography/P";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import yogaPoses from "@/lib/yoga-poses";
import Image from "next/image";
import Link from "next/link";

export default function PreferredPoses() {
  return (
    <div className="container mx-auto py-4">
      <TypographyH1>Preferred Poses</TypographyH1>
      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        {yogaPoses.map((pose, index) => (
          <Card key={index} className="flex flex-col overflow-hidden">
            <div className="relative w-full pt-[100%]">
              <Image
                src={pose.image || "/placeholder.svg"}
                alt={`${pose.title} pose`}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader>
              <CardTitle>{pose.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <TypographyP>{pose.description}</TypographyP>
            </CardContent>
            <CardFooter className="justify-end">
              <Link href={`/poses/${pose.name}`}>
                <Button>Try Pose</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
