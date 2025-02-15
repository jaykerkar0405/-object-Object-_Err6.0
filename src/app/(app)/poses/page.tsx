"use client";

import { useState } from "react";
import { TypographyH1 } from "@/components/typography/H1";
import { TypographyP } from "@/components/typography/P";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { yogaPoses } from "@/lib/yoga-poses";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PreferredPoses() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPoses = yogaPoses.filter((pose) =>
    pose.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-4">
      <TypographyH1>Preferred Poses</TypographyH1>
      <div className="flex w-full items-center gap-2 mt-5 mb-3">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          className="grow"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button asChild>
          <Link href="/poses/view">
            View data <ChevronRight />
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPoses.length > 0 ? (
          filteredPoses.map((pose, index) => (
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
          ))
        ) : (
          <p className="text-center text-gray-500">No poses found.</p>
        )}
      </div>
    </div>
  );
}
