import {
  boolean,
  foreignKey,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { UsersTable } from './users';
import { time } from 'console';

export const WorkoutPlansTable = pgTable('workout_plans', {
  id: serial('id').primaryKey(),
  creatorId: integer('user_id').references(() => UsersTable.id, {
    onDelete: 'cascade',
  }),
  name: text('workout_plan_name').notNull(),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const muscleNameEnum = pgEnum('muscle_name', [
  'chest',
  'back',
  'legs',
  'shoulders',
  'bicep',
  'triceps',
  'abs',
  'calves',
  'cardio',
  'butt',
  'forearm',
  'base',
]);

export const ExercisesTable = pgTable('exercises', {
  id: serial('id').primaryKey(),
  exerciseName: text('exercise_name').notNull(),
  restTime: text('rest_time').notNull().default('60'),

  notes: text('exercise_notes'),
  userId: integer('user_id'),
  isDefault: boolean('is_default_exercise').notNull().default(false),
  primaryMuscleTargeted: muscleNameEnum('primary_muscle_targeted')
    .notNull()
    .references(() => MusclesTable.name, {
      onDelete: 'cascade',
    }),
  isCreatorDeveloper: boolean('is_exercise_creator_developer'),
});

export const WorkoutSessionsTable = pgTable('workout_sessions', {
  id: serial('id').primaryKey(),
  workoutPlanId: integer('workout_plan_id')
    .references(() => WorkoutPlansTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  startedAt: timestamp('started_at', {
    mode: 'date',
    withTimezone: true,
  }),

  finishedAt: timestamp('finished_at', {
    mode: 'date',
    withTimezone: true,
  }),

  userId: integer('user_id').notNull(),
});

export const MusclesTable = pgTable('primary_muscles', {
  id: serial('id').primaryKey(),
  name: muscleNameEnum('muscle_name').notNull().unique(),
});

export const WorkoutExercisesTable = pgTable(
  'workout_plan_exercises',
  {
    workoutPlanId: integer('workout_plan_id')
      .notNull()
      .references(() => WorkoutPlansTable.id, {
        onDelete: 'cascade',
      }),

    exerciseId: integer('exercise_id')
      .notNull()
      .references(() => ExercisesTable.id, {
        onDelete: 'cascade',
      }),
    orderIndex: integer('order_index').notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.workoutPlanId, table.exerciseId] }),
    workoutPlanIdIndex: index('workout_exercises_workout_plan_id_index').on(
      table.workoutPlanId,
    ),
    exerciseIdIndex: index('workout_exercises_exercise_id_index').on(
      table.exerciseId,
    ),
  }),
);

export const WorkoutExerciseSetsTable = pgTable(
  'workout_exercise_sets',
  {
    id: serial('id').primaryKey(),
    workoutPlanId: integer('workout_exercise_workout_plan_id').notNull(),

    workoutExerciseId: integer('workout_exercise_id').notNull(),

    userId: integer('user_id')
      .notNull()
      .references(() => UsersTable.id, {
        onDelete: 'cascade',
      }),
    workoutSessionId: integer('workout_session_id').references(
      () => WorkoutSessionsTable.id,
    ),
    exerciseSetNumber: text('exercise_set_number').notNull().default('1'),
    reps: text('reps').notNull().default('10'),
    weight: text('weight').notNull().default('0'),
    rir: text('rir'),
    tempo: text('tempo'),
  },
  (table) => ({
    workoutExerciseIndex: index(
      'workout_exercise_sets_workout_exercise_index',
    ).on(table.workoutPlanId, table.workoutExerciseId),
    workoutExerciseFK: foreignKey({
      columns: [table.workoutPlanId, table.workoutExerciseId],
      foreignColumns: [
        WorkoutExercisesTable.workoutPlanId,
        WorkoutExercisesTable.exerciseId,
      ],
    }).onDelete('cascade'),
  }),
);
