import {
  UserDiscordConnections,
  UsersMetricsTable,
  UsersTable,
} from 'src/db/schema/users';

export type UserModel = typeof UsersTable.$inferSelect;

export type UserDiscordModel = typeof UserDiscordConnections.$inferSelect;

export type UserMetricsModel = typeof UsersMetricsTable.$inferSelect;

export type DetailedUserModel = {
  user: UserModel;
  metrics: Omit<UserMetricsModel, 'userId'>;
  discordConnection: Omit<UserDiscordModel, 'userId'>;
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
};

export const initDetailedUserModel: DetailedUserModel = {
  user: {
    id: 0,
    createdAt: new Date(),
    username: '',
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
};
