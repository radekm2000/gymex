import {
  ExercisesTable,
  WorkoutExerciseSetsTable,
  WorkoutExercisesTable,
  WorkoutPlansTable,
} from 'src/db/schema/workout';

export type WorkoutModel = typeof WorkoutPlansTable.$inferSelect;

export type ExerciseModel = typeof ExercisesTable.$inferSelect;

export type WorkoutExerciseModel = typeof WorkoutExercisesTable.$inferSelect;

export type WorkoutExerciseSetsModel =
  typeof WorkoutExerciseSetsTable.$inferSelect;

export type DetailedWorkoutModel = {
  workout: WorkoutModel;
  exercises: ExerciseModel[];
  exerciseSets: WorkoutExerciseSetsModel[];
};

export const initDetailedWorkoutModel: DetailedWorkoutModel = {
  workout: {
    name: '',
    id: -1,
    creatorId: -1,
    createdAt: new Date(),
  },
  exercises: [
    {
      description: '',
      exerciseName: '',
      id: -1,
    },
  ],
  exerciseSets: [
    {
      exerciseSetNumber: '',
      id: -1,
      reps: '',
      restTime: '',
      rir: '',
      tempo: '',
      weight: '',
      workoutExerciseId: -1,
      workoutPlanId: -1,
    },
  ],
};
