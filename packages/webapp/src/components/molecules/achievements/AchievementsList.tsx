import { useMediaQuery } from "usehooks-ts";
import { Card } from "../../ui/card";
import { useAuth } from "../../../hooks/use-auth";
import { AchievementItem } from "./AchievementItem";
import { ACHIEVEMENTS } from "@gymex/commons/src";

export const AchievementsList = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { user } = useAuth();

  const userId = user.model.user.id;
  const userAchievements = user.achievements;

  return (
    <Card className="flex flex-col flex-grow w-full gap-4 min-h-3">
      <span className="mr-auto text-2xl">Achievements</span>
      {userId ? (
        <div
          className={`${isDesktop ? "grid grid-cols-2" : "grid grid-cols-1 "} gap-4 `}
        >
          {Object.entries(ACHIEVEMENTS).map(([achievementKey, achievement]) => {
            const userAchievement = userAchievements[achievementKey];
            return (
              <AchievementItem
                key={achievementKey}
                achievementName={achievement.name}
                description={achievement.description}
                userProgress={userAchievement?.progress}
                requiredProgress={achievement.requiredProgress}
                unlocked={userAchievement?.unlocked}
              />
            );
          })}
        </div>
      ) : (
        <span className="text-secondary-customGray">
          SIGN IN TO SEE ACHIEVEMENTS
        </span>
      )}
    </Card>
  );
};
