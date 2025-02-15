import { TypographyH1 } from "@/components/typography/H1";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function RoutinesPage() {
  return (
    <>
      <TypographyH1>Routines</TypographyH1>
      <Button asChild>
        <Link href="/routines/create">
          Create <PlusIcon />
        </Link>
      </Button>
    </>
  );
}
