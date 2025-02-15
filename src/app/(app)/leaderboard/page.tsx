import { Trophy, Medal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LeaderboardComponent = () => {
  const leaderboardData = [
    {
      rank: 1,
      username: "ProGamer123",
      score: 2500,
      avatarUrl: "/api/placeholder/32/32",
    },
    {
      rank: 2,
      username: "PixelWarrior",
      score: 2350,
      avatarUrl: "/api/placeholder/32/32",
    },
    {
      rank: 3,
      username: "GameMaster",
      score: 2200,
      avatarUrl: "/api/placeholder/32/32",
    },
    {
      rank: 4,
      username: "EpicPlayer",
      score: 2100,
      avatarUrl: "/api/placeholder/32/32",
    },
    {
      rank: 5,
      username: "LegendStatus",
      score: 2000,
      avatarUrl: "/api/placeholder/32/32",
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return (
          <span className="text-lg font-bold text-muted-foreground">
            {rank}
          </span>
        );
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((player) => (
            <div
              key={player.rank}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(player.rank)}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={player.avatarUrl} alt={player.username} />
                  <AvatarFallback>{player.username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold">{player.username}</span>
                  <span className="text-sm text-muted-foreground">
                    {player.score} pts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardComponent;
