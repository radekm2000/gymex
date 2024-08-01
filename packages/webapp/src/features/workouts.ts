export type WorkoutModel = {
  id: number;
  createdAt: Date;
  name: string;
  creatorId: number;
};

export type ExerciseModel = {
  id: number;
  notes: string;
  exerciseName: string;
  restTime: string;
  userId: number;
  isDefault: boolean;
  primaryMuscleTargeted:
    | "chest"
    | "back"
    | "legs"
    | "shoulders"
    | "bicep"
    | "triceps"
    | "abs"
    | "calves"
    | "cardio"
    | "butt"
    | "forearm"
    | "base";
  isCreatorDeveloper: boolean;
};

export type WorkoutSessionModel = {
  id: number;
  userId: number;
  workoutPlanId: number;
  startedAt: Date;
  finishedAt: Date;
};

export type WokoutExerciseModel = {
  workoutPlanId: number;
  exerciseId: number;
  orderIndex: number;
};

export type WorkoutExerciseSetsWithoutPlanAndExerciseIds = Omit<
  WorkoutExerciseSetsModel,
  "workoutPlanId" | "workoutExerciseId"
>;

export type WorkoutExerciseSetsModel = {
  id: number;
  userId: number;
  workoutPlanId: number;
  workoutExerciseId: number;
  workoutSessionId: number;
  exerciseSetNumber: string;
  reps: string;
  weight: string;
  rir: string;
  tempo: string;
  isStaticSet: boolean;
  holdSecs: string;
};

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
