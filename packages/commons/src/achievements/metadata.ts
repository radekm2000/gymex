import { UserAchievementType } from "./types";

type UserAchievement = {
  name: string;
  description: string;
  requiredProgress?: number;
};

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
};
