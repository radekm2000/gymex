export type UserAchievementStatus = {
  unlocked: boolean;
  progress?: number;
};

export type UserAchievement = {
  name: string;
  description: string;
  requiredProgress?: number;
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
} as const;

export type UserAchievementType =
  (typeof UserAchievementType)[keyof typeof UserAchievementType];
