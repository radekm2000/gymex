import {
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('user_role', ['Admin', 'User']);

export const UsersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  role: roleEnum('user_role').default('User').notNull(),
});

export const UsersMetricsTable = pgTable(
  'user_metrics',
  {
    userId: integer('user_id')
      .primaryKey()
      .references(() => UsersTable.id, {
        onDelete: 'cascade',
      }),

    weight: text('weight'),
    height: text('height'),
  },
  (table) => ({
    userIdIndex: index('user_metrics_user_id_index').on(table.userId),
  }),
);

export const UserDiscordConnections = pgTable('user_discord_connections', {
  userId: integer('user_id')
    .primaryKey()
    .references(() => UsersTable.id, {
      onDelete: 'cascade',
    }),
  accessToken: text('discord_access_token'),
  avatar: text('discord_avatar'),
  discordId: text('discord_id'),
  username: text('discord_username'),
});

export type UserDiscordModel = typeof UserDiscordConnections.$inferSelect;

export type UserMetricsModel = typeof UsersMetricsTable.$inferSelect;
