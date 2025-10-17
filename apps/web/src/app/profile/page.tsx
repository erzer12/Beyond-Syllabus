import React from "react";
import styles from "./page.module.css";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Medal, Trophy, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <Avatar className={styles.avatar}>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className={styles.username}>Shadcn</h1>
          <p className={styles.userHandle}>@shadcn</p>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <Card>
          <CardHeader>
            <CardTitle>Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.level}>
              <Medal className="h-10 w-10 text-yellow-500" />
              <span className="text-4xl font-bold">12</span>
            </div>
            <Progress value={45} className="mt-4" />
            <p className="text-sm text-center mt-2">450/1000 XP to next level</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.streak}>
              <Zap className="h-10 w-10 text-orange-500" />
              <span className="text-4xl font-bold">5</span>
              <span className="text-lg">days</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.rank}>
              <Trophy className="h-10 w-10 text-blue-500" />
              <span className="text-4xl font-bold">#5</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className={styles.sectionTitle}>Achievements</h2>
        <div className={styles.achievementsContainer}>
          <Badge variant="outline">Wise Owl</Badge>
          <Badge variant="outline">Early Bird</Badge>
          <Badge variant="outline">Perfect Week</Badge>
          <Badge variant="outline">Subject Master</Badge>
          <Badge variant="outline">Consistent Learner</Badge>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
