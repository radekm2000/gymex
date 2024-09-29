export type UserModel = {
  id: number;
  username: string;
  createdAt: Date;
  role: "Admin" | "User";
};

export type UserMetricsModel = {
  weight: string;
  userId: number;
  height: string;
};

export type UserDiscordModel = {
  username: string;
  userId: number;
  accessToken: string;
  avatar: string;
  discordId: string;
};

export type UserAchievementStatus = {
  unlocked: boolean;
  progress?: number;
};

export type UserStatsModel = {
  userId: number;
  totalWeight: number;
  maxWeight: number;
  
  totalSessions: number;
  totalTrainingTime: number;
  achievements: Record<string, UserAchievementStatus>;
};

export type UserDetails = {
  user: UserModel;
  metrics: Omit<UserMetricsModel, "userId">;
  discordConnection: Omit<UserDiscordModel, "userId">;
  stats: Omit<UserStatsModel, "userId">;
};
