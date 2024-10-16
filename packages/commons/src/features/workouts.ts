export type WorkoutModel = {
  id: number;
  createdAt: Date;
  name: string;
  creatorId: number;
};

export type PrimaryMuscleTargeted =
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

export type ExerciseModel = {
  id: number;
  notes: string;
  exerciseName: string;
  restTime: string;
  userId: number;
  isDefault: boolean;
  primaryMuscleTargeted: PrimaryMuscleTargeted;
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
    startedAt: Date;
    finishedAt: Date;
    id: number;
  };
};

export const restTimeOptions = [
  "30",
  "45",
  "60",
  "90",
  "120",
  "150",
  "180",
  "240",
  "300",
] as const;

export type RestTimeOptions = (typeof restTimeOptions)[number];

export const initDetailedWorkoutModel: DetailedWorkoutModel = {
  workout: {
    name: "",
    id: -1,
    creatorId: -1,
    createdAt: new Date(),
  },
  exercises: [
    {
      notes: "",
      exerciseName: "",
      id: -1,
      userId: 0,
      isDefault: false,
      primaryMuscleTargeted: "base",
      isCreatorDeveloper: false,
      restTime: "60",
      sets: [
        {
          exerciseSetNumber: "1",
          id: -1,
          reps: "10",
          rir: "",
          tempo: "",
          userId: -1,
          weight: "0",
          workoutSessionId: 0,
          holdSecs: "0",
          isStaticSet: false,
        },
      ],
    },
  ],
  allExerciseSets: [
    {
      exerciseSetNumber: "",
      id: -1,
      reps: "",
      rir: "",
      tempo: "",
      weight: "",
      workoutExerciseId: -1,
      workoutPlanId: -1,
      userId: -1,
      workoutSessionId: 0,
      holdSecs: "0",
      isStaticSet: false,
    },
  ],
  session: {
    id: 0,
    finishedAt: new Date(),
    startedAt: new Date(),
  },
};

export type WorkoutHistory = {
  detailedWorkoutModel: DetailedWorkoutModel;
  workoutSummary: WorkoutSummary;
};
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type Month = (typeof months)[number];

export type MonthYear = `${Month} ${number}`;

export type GroupedWorkouts = {
  date: Record<MonthYear, WorkoutHistory[]>;
};
export type ExerciseSet = {
  exerciseSetNumber: string;
  reps: string;
  weight: string;
  rir?: string;
  tempo?: string;
  isStaticSet?: boolean;
  holdSecs?: string;
};

export type MuscleName =
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

export type MuscleStats = {
  [key in MuscleName]?: number;
};

export type WorkoutSummary = {
  totalSets: number;
  totalWeight: number;
  maxWeight: number;
  totalExercises: number;
  totalReps: number;
  muscleStats: MuscleStats;
  totalTrainingTimeInSeconds: number;
};

export type AddExerciseToWorkout = {
  id: number;
  notes?: string;
  sets: ExerciseSet[];
  exerciseName: string;
  restTime: string;
  orderIndex: number;
  primaryMuscleTargeted?: string;
};
export type WorkoutCreateSchema = {
  workoutName: string;
  exercises: AddExerciseToWorkout[];
};

export type ActiveWorkoutFinishSchema = {
  workout: {
    name: string;
    id: number;
  };
  exercises: AddExerciseToWorkout[];
};

export type ExerciseWithoutExerciseName = Omit<
  AddExerciseToWorkout,
  "exerciseName"
>;

export type WorkoutCreateDtoSchemaWithoutExerciseName = {
  workoutName: string;
  exercises: ExerciseWithoutExerciseName[];
};

export const initialWorkout: WorkoutCreateSchema = {
  workoutName: "",
  exercises: [],
};

export type UserMetricsUpdateDto = {
  displayName: string;
  height: string;
  weight: string;
};


