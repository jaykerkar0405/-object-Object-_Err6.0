import { TypographyH1 } from "@/components/typography/H1";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MeditationPage() {
  const meditationTips = [
    {
      image: "/meditation-img/back.png",
      title: "Keep Your Back Straight",
      description:
        "Sit comfortably with a straight spine to maintain good posture and allow energy to flow freely.",
    },
    {
      image: "/meditation-img/breathe.png",
      title: "Breathe Deeply & Naturally",
      description:
        "Focus on slow, deep breaths to calm your mind and body. Let your breath guide you into relaxation.",
    },
    {
      image: "/meditation-img/concentrate.png",
      title: "Close Your Eyes & Concentrate",
      description:
        "Gently close your eyes and bring your attention to a single point—your breath, a mantra, or a calming sound—to stay present and centered.",
    },
  ];
  return (
    <div className="container py-4">
      <div className="mb-4">
        <TypographyH1>Meditation Tips</TypographyH1>
      </div>
      <div className="flex flex-col gap-4 ">
        {meditationTips.map((meditationTip, index) => (
          <Card className="w-full max-w-sm" key={index}>
            <div className="aspect-w-4 aspect-h-5 relative">
              <img
                src={meditationTip.image}
                alt="Meditation pic"
                className="object-cover rounded-t-lg"
                style={{ aspectRatio: "400/500", objectFit: "cover" }}
              />
            </div>
            <CardHeader className="grid gap-1 p-4">
              <CardTitle>{meditationTip.title}</CardTitle>
              <CardDescription>{meditationTip.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
        <Button>Start Meditation</Button>
      </div>
    </div>
  );
}
