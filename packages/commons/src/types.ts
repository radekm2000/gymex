import { z } from "zod";

export const ExerciseSetSchema = z.object({
  exerciseSetNumber: z.string().default("1"),
  reps: z.string().default("10"),
  weight: z.string().default("0"),
  rir: z.string().optional(),
  tempo: z.string().optional(),
  isStaticSet: z.boolean().optional(),
  holdSecs: z.string().optional(),
});

export type ExerciseSetDto = z.infer<typeof ExerciseSetSchema>;

export const AddExerciseToWorkoutDtoSchema = z.object({
  id: z.number(),
  notes: z.string().optional(),
  sets: z.array(ExerciseSetSchema).min(1),
  orderIndex: z.number().int().nonnegative(),
});

export const CreateWorkoutWithExercisesDtoSchema = z.object({
  workoutName: z.string().max(64),
  exercises: z.array(AddExerciseToWorkoutDtoSchema).min(1),
});

export type CreateWorkoutWithExercisesDto = z.infer<
  typeof CreateWorkoutWithExercisesDtoSchema
>;

export type UpdateExerciseStatsDto = {
  userId: number;
  exerciseId: number;
  totalWeight: number;
  totalSets: number;
  totalReps: number;
  maxWeight: number;
  finishedAt: Date;
};

export type ExerciseHistory = Omit<
  UpdateExerciseStatsDto,
  "exerciseId" | "userId"
>[];

export type ExerciseOverallStats = {
  overallTotalWeight: number;
  overallTotalSets: number;
  overallTotalReps: number;
  overallMaxWeight: number;
  exerciseName: string;
};

type UserAchievement = {
  name: string;
  description: string;
  requiredProgress?: number;
};

export type UserAchievementStatus = {
  unlocked: boolean;
  progress?: number;
};

export const UserAchievementType = {
  TOTAL_WEIGHT_LIFT_10T: "TOTAL_WEIGHT_LIFT_10T",
  TOTAL_WEIGHT_LIFT_25T: "TOTAL_WEIGHT_LIFT_25T",
  TOTAL_WEIGHT_LIFT_50T: "TOTAL_WEIGHT_LIFT_50T",
  TOTAL_WEIGHT_LIFT_100T: "TOTAL_WEIGHT_LIFT_100T",
  TOTAL_SESSIONS_1: "TOTAL_SESSIONS_1",
  TOTAL_SESSIONS_10: "TOTAL_SESSIONS_10",
  TOTAL_SESSIONS_50: "TOTAL_SESSIONS_50",
  TOTAL_SESSIONS_100: "TOTAL_SESSIONS_100",
  TOTAL_TRAINING_TIME_1D: "TOTAL_TRAINING_TIME_1D",
  TOTAL_SETS_10: "TOTAL_SETS_10",
  MAX_WEIGHT_50KG: "MAX_WEIGHT_50KG",
  MAX_WEIGHT_100KG: "MAX_WEIGHT_100KG",
} as const;

export type UserAchievementType =
  (typeof UserAchievementType)[keyof typeof UserAchievementType];

export const ACHIEVEMENTS: Record<UserAchievementType, UserAchievement> = {
  TOTAL_SESSIONS_1: {
    name: "Beginner",
    description: "1 Total Session",
    requiredProgress: 1,
  },
  TOTAL_SESSIONS_10: {
    name: "Amateur",
    description: "10 Total Sessions",
    requiredProgress: 10,
  },
  TOTAL_SESSIONS_50: {
    name: "Newbie",
    description: "50 Total Sessions",
    requiredProgress: 50,
  },
  TOTAL_SESSIONS_100: {
    name: "Intermediate",
    description: "100 Total Sessions",
    requiredProgress: 100,
  },
  TOTAL_SETS_10: {
    name: "Set beginner",
    description: "10 Total sets",
    requiredProgress: 10,
  },
  TOTAL_WEIGHT_LIFT_100T: {
    name: "Weightlifting Pro",
    description: "Lifted a total of 100,000 kg",
    requiredProgress: 100000, // 100T in kilograms
  },
  TOTAL_WEIGHT_LIFT_10T: {
    name: "Weightlifting Novice",
    description: "Lifted a total of 10,000 kg",
    requiredProgress: 10000, // 10T in kilograms
  },
  TOTAL_WEIGHT_LIFT_25T: {
    name: "Weightlifting Enthusiast",
    description: "Lifted a total of 25,000 kg",
    requiredProgress: 25000, // 25T in kilograms
  },
  TOTAL_WEIGHT_LIFT_50T: {
    name: "Weightlifting Expert",
    description: "Lifted a total of 50,000 kg",
    requiredProgress: 50000, // 50T in kilograms
  },
  TOTAL_TRAINING_TIME_1D: {
    name: "One Day Warrior",
    description: "Trained for a total of 24 hours",
    requiredProgress: 86400, // 1 day in seconds (24 hours * 60 minutes * 60 seconds)
  },
  MAX_WEIGHT_50KG: {
    name: "Boomer",
    description: "You carried 50kg",
    requiredProgress: 50,
  },
  MAX_WEIGHT_100KG: {
    name: "Giga",
    description: "You carried 100kg",
    requiredProgress: 100,
  },
};
