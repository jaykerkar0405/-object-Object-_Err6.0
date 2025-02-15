import { TypographyH1 } from "@/components/typography/H1";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import yogaPoses from "@/lib/yoga-poses";

export default function Routines() {
  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col gap-4 items-start">
        <TypographyH1>Create Routine</TypographyH1>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a pose" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pose</SelectLabel>
              {yogaPoses.map((yogaPose, index) => (
                <SelectItem key={index} value={yogaPose.title}>
                  {yogaPose.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
