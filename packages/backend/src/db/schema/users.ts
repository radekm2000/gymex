import {
  boolean,
  doublePrecision,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { ExercisesTable } from './workout';

export type UserDiscordModel = typeof UserDiscordConnections.$inferSelect;

export type UserMetricsModel = typeof UsersMetricsTable.$inferSelect;

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
    badges: text('badges').array(),
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

export const UserExerciseStatsTable = pgTable('user_exercise_stats', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => UsersTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  exerciseId: integer('exercise_id').references(() => ExercisesTable.id, {
    onDelete: 'cascade',
  }),

  finishedAt: timestamp('finished_at', {
    mode: 'date',
    withTimezone: true,
  }),
  totalWeight: doublePrecision('total_weight').notNull().default(0),
  totalReps: integer('total_reps').notNull().default(0),
  totalSets: integer('total_sets').notNull().default(0),
  maxWeight: doublePrecision('max_weight').notNull().default(0),
});

export const UserAchievementsTable = pgTable(
  'user_achievements',
  {
    achievementId: text('achievement_id').notNull(),
    userId: serial('user_id')
      .references(() => UsersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    isUnlocked: boolean('is_unlocked').notNull().default(false),
    progress: doublePrecision('progress'),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.achievementId, table.userId] }),
    userIdIndex: index('user_achievements_user_id_index').on(table.userId),
  }),
);

export const UserStatsWeightLiftTable = pgTable('user_stats_weight_lift', {
  userId: integer('user_id').primaryKey(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  totalWeight: integer('total_weight').notNull().default(0),
  maxWeight: integer('max_weight').notNull().default(0),
});

export const UserStatsSessionsTable = pgTable('user_stats_sessions', {
  userId: integer('user_id').primaryKey(),
  totalSessions: integer('total_sessions').notNull().default(0),
  totalTrainingTime: integer('total_training_time').notNull().default(0),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
