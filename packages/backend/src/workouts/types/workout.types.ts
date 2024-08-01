import {
  ExercisesTable,
  WorkoutExerciseSetsTable,
  WorkoutExercisesTable,
  WorkoutPlansTable,
  WorkoutSessionsTable,
} from 'src/db/schema/workout';
import { WorkoutExerciseSetsWithoutPlanAndExerciseIds } from '../model/workout.model';

export type WorkoutModel = typeof WorkoutPlansTable.$inferSelect;

export type ExerciseModel = typeof ExercisesTable.$inferSelect;

export type WorkoutSessionModel = typeof WorkoutSessionsTable.$inferSelect;

export type WokoutExerciseModel = typeof WorkoutExercisesTable.$inferSelect;

export type WorkoutExerciseSetsModel =
  typeof WorkoutExerciseSetsTable.$inferSelect;

  

export type DetailedWorkoutModel = {
  workout: WorkoutModel;
  exercises: Array<
    ExerciseModel & { sets: WorkoutExerciseSetsWithoutPlanAndExerciseIds[] }
  >;
  allExerciseSets: WorkoutExerciseSetsModel[];
  session: {
    id: number;
  };
};

export const defaultWorkoutModel: WorkoutModel = {
  createdAt: new Date('2024-01-01T00:00:00Z'),
  creatorId: 0,
  id: 0,
  name: 'workout',
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
      notes: '',
      exerciseName: '',
      id: -1,
      userId: null,
      isDefault: false,
      primaryMuscleTargeted: 'base',
      isCreatorDeveloper: false,
      restTime: '60',
      sets: [
        {
          exerciseSetNumber: '1',
          id: -1,
          reps: '10',
          rir: null,
          tempo: null,
          userId: -1,
          weight: '0',
          workoutSessionId: 0,
          holdSecs: '0',
          isStaticSet: false,
        },
      ],
    },
  ],
  allExerciseSets: [
    {
      exerciseSetNumber: '',
      id: -1,
      reps: '',
      rir: '',
      tempo: '',
      weight: '',
      workoutExerciseId: -1,
      workoutPlanId: -1,
      userId: -1,
      workoutSessionId: 0,
      holdSecs: '0',
      isStaticSet: false,
    },
  ],
  session: {
    id: 0,
  },
};
