import { Card } from "../../ui/card";
import gymexLogo from "../../../assets/logo.png";
import { useMediaQuery } from "usehooks-ts";
import { AchievementProgressBar } from "../../atoms/AchievementProgressBar";

type Props = {
  achievementName: string;
  description: string;
  requiredProgress: number | undefined;
  userProgress?: number | undefined;
  unlocked: boolean;
};

export const AchievementItem = ({
  achievementName,
  description,
  requiredProgress,
  unlocked,
  userProgress,
}: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <Card
      className={`flex flex-col  items-center bg-primary-dark ${unlocked ? "opacity-100" : "opacity-70"}`}
    >
      <div className="flex items-center w-full">
        <div className="flex flex-col">
          <span className="text-secondary-veryLight font-display">
            {achievementName.toUpperCase()}
          </span>
          <span
            className={`${isDesktop ? "" : "text-sm"} text-secondary-customGray`}
          >
            {description}
          </span>
        </div>
        <Card className="ml-auto opacity-100 bg-primary-darker">
          {isDesktop ? (
            <img src={gymexLogo} width={60} height={60} />
          ) : (
            <img src={gymexLogo} width={50} height={40} />
          )}
        </Card>
      </div>
      <div className="w-full mt-4">
        <AchievementProgressBar
          progress={userProgress}
          requiredProgress={requiredProgress}
        />
      </div>
    </Card>
  );
};
