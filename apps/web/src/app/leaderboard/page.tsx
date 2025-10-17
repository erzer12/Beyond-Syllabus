import React from "react";
import styles from "./page.module.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown } from "lucide-react";

const LeaderboardPage = () => {
  const users = [
    { rank: 1, name: "Shadcn", xp: 12000, avatar: "https://github.com/shadcn.png" },
    { rank: 2, name: "Vercel", xp: 11500, avatar: "https://github.com/vercel.png" },
    { rank: 3, name: "Next.js", xp: 11000, avatar: "https://github.com/next.png" },
    { rank: 4, name: "React", xp: 10500, avatar: "https://github.com/react.png" },
    { rank: 5, name: "Tailwind CSS", xp: 10000, avatar: "https://github.com/tailwind.png" },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Leaderboard</h1>
      <Card>
        <CardContent className={styles.leaderboardList}>
          {users.map((user, index) => (
            <div key={index} className={styles.leaderboardItem}>
              <div className="flex items-center gap-4">
                <span className={styles.rank}>{user.rank}</span>
                <Avatar className={styles.avatar}>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{user.xp} XP</span>
                {user.rank === 1 && <Crown className="h-6 w-6 text-yellow-500" />}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardPage;
