import {
  UserDiscordConnections,
  UsersMetricsTable,
  UsersTable,
} from 'src/db/schema/users';

export type UserModel = typeof UsersTable.$inferSelect;

export type UserMetrics = {
  weight: string;
  height: string;
};

export type UserDiscordModel = typeof UserDiscordConnections.$inferSelect;

export type UserMetricsModel = typeof UsersMetricsTable.$inferSelect;

export type DetailedUserModel = {
  user: UserModel;
  metrics: Omit<UserMetricsModel, 'userId'>;
  discordConnection: Omit<UserDiscordModel, 'userId'>;
};
