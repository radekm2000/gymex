import { UserAchievementStatus } from '@gymex/commons/src/achievements/types';
import {
  UserDiscordConnections,
  UsersMetricsTable,
  UsersTable,
} from 'src/db/schema/users';

export type UserModel = typeof UsersTable.$inferSelect;

export type UserDiscordModel = typeof UserDiscordConnections.$inferSelect;

export type UserMetricsModel = typeof UsersMetricsTable.$inferSelect;

export type UserStatsModel = {
  userId: number;
  totalWeight: number;
  maxWeight: number;
  totalSessions: number;
  totalTrainingTime: number;
  achievements: Record<string, UserAchievementStatus>;
};

export type DetailedUserModel = {
  user: UserModel;
  metrics: Omit<UserMetricsModel, 'userId'>;
  discordConnection: Omit<UserDiscordModel, 'userId'>;
  stats: Omit<UserStatsModel, 'userId'>;
};

export const initUserMetrics: UserMetricsModel = {
  userId: 0,
  weight: '',
  height: '',
};

export const initDiscordUserModel: UserDiscordModel = {
  accessToken: '',
  avatar: '',
  discordId: '',
  userId: 0,
  username: '',
};

export const initUserModel: UserModel = {
  id: 0,
  createdAt: new Date(),
  username: '',
  role: 'User',
};

export const initDetailedUserModel: DetailedUserModel = {
  user: {
    id: 0,
    createdAt: new Date(),
    username: '',
    role: 'User',
  },
  discordConnection: {
    accessToken: '',
    avatar: '',
    discordId: '',
    username: '',
  },
  metrics: {
    weight: '',
    height: '',
  },
  stats: {
    maxWeight: 0,
    totalSessions: 0,
    totalTrainingTime: 0,
    totalWeight: 0,
    achievements: {},
  },
};
