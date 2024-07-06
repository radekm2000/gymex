import {
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { UsersTable } from './users';

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

export const ExercisesTable = pgTable('exercises', {
  id: serial('id').primaryKey(),
  exerciseName: text('exercise_name').notNull(),
  description: text('exercise_description'),
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
    workoutPlanId: integer('workout_exercise_workout_plan_id')
      .notNull()
      .references(() => WorkoutExercisesTable.workoutPlanId, {
        onDelete: 'cascade',
      }),
    workoutExerciseId: integer('workout_exercise_id')
      .notNull()
      .references(() => WorkoutExercisesTable.exerciseId, {
        onDelete: 'cascade',
      }),
    exerciseSetNumber: text('exercise_set_number').notNull().default('0'),
    reps: text('reps').notNull().default('0'),
    weight: text('weight').notNull().default('0'),
    rir: text('rir'),
    tempo: text('tempo'),
    restTime: text('rest_time').notNull().default('60'),
  },
  (table) => ({
    workoutExerciseIndex: index(
      'workout_exercise_sets_workout_exercise_index',
    ).on(table.workoutPlanId, table.workoutExerciseId),
  }),
);
