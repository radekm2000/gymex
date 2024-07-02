import { index, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  createdAt: timestamp('created_at', {
    mode: 'date',
  }),
  discordId: text('discord_id'),
  googleId: text('google_id'),
});

export const UsersMetricsTable = pgTable(
  'user_metrics',
  {
    userId: text('user_id')
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
