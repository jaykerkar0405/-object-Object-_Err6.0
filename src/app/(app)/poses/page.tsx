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
import Image from "next/image";
import Link from "next/link";

interface YogaPose {
  title: string;
  description: string;
  img: string;
  name: string;
}

const yogaPoses: YogaPose[] = [
  {
    title: "Downward Dog",
    description:
      "Adho Mukha Svanasana - A foundational yoga pose that stretches the entire body, strengthens the arms and legs, and improves circulation.",
    img: "/downward-dog.png",
    name: "downward-dog",
  },
  {
    title: "Warrior II",
    description:
      "Virabhadrasana II - A powerful standing pose that builds strength in the legs, enhances stability, and opens the hips and chest.",
    img: "/warrior.png",
    name: "warrior",
  },
  {
    title: "Tree Pose",
    description:
      "Vrikshasana - A balancing pose that strengthens the legs and core while improving focus and stability.",
    img: "/tree.png",
    name: "tree-pose",
  },
];

export default function PreferredPoses() {
  return (
    <div className="container mx-auto py-4">
      <TypographyH1>Preferred Poses</TypographyH1>
      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        {yogaPoses.map((pose, index) => (
          <Card key={index} className="flex flex-col overflow-hidden">
            <div className="relative w-full pt-[100%]">
              <Image
                src={pose.img || "/placeholder.svg"}
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
