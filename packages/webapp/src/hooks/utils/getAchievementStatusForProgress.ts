import {
  ACHIEVEMENTS,
  UserAchievementStatus,
  UserAchievementType,
} from "@gymex/commons/src";

export const getAchievementStatusForProgress = (
  type: UserAchievementType,
  progress: number
): UserAchievementStatus => {
  const { requiredProgress } = ACHIEVEMENTS[type];
  if (requiredProgress) {
    return {
      progress: Math.min(progress, requiredProgress),
      unlocked: progress >= requiredProgress,
    };
  } else if (progress) {
    return { unlocked: true };
  }
  return { unlocked: false };
};
