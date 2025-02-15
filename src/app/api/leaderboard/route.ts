import prisma from "@/lib/prisma";

export async function GET() {
  const breathingData = await prisma.breathing.findMany({
    select: {
      userId: true,
      duration: true,
      breathingPattern: true,
      user: {
        select: { id: true, name: true, image: true },
      },
    },
  });

  function calculatePoints(duration: number, breathingPattern: string) {
    let bonus = 0;
    if (breathingPattern === "deep") bonus = 50;
    else if (breathingPattern === "relaxing") bonus = 30;
    else if (breathingPattern === "fast") bonus = 10;

    return duration + bonus;
  }

  // Aggregate scores per userId
  const userScores = new Map();

  for (const data of breathingData) {
    const { userId, duration, breathingPattern, user } = data;
    const points = calculatePoints(duration, breathingPattern);

    if (!userScores.has(userId)) {
      userScores.set(userId, {
        userId,
        name: user.name,
        image: user.image || "",
        score: 0, // Initialize score
      });
    }

    userScores.get(userId)!.score += points; // Accumulate score
  }

  // Convert to array and sort by score (highest first)
  const leaderboard = Array.from(userScores.values()).sort(
    (a, b) => b.score - a.score
  );

  return Response.json(
    leaderboard.map((player, index) => ({
      ...player,
      rank: index + 1,
    }))
  );
}
