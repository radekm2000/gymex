import { useMediaQuery } from "usehooks-ts";
import { Card } from "../../ui/card";

type Props = {
  username: string;
  avatar: JSX.Element;
  achievementsUnlocked: number;
  rank: number;
  totalAchievements: number;
};

const getHeightClass = (rank: number) => {
  if (rank === 1) return "h-28";
  if (rank === 2) return "h-24";
  if (rank === 3) return "h-20";
  return "h-24";
};

const getRankNumberSize = (rank: number) => {
  if (rank === 1) return "text-3xl";
  if (rank === 2) return "text-2xl";
  if (rank === 3) return "text-xl";
};

const getOpacityForUser = (rank: number) => {
  if (rank === 1) return "opacity-100";
  else {
    return "opacity-90";
  }
};

export const LeaderboardUserCard = ({
  username,
  avatar,
  achievementsUnlocked,
  rank,
  totalAchievements,
}: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Card
      className={`flex items-center ${getOpacityForUser(rank)}  ${getHeightClass(rank)} gap-2 border-none `}
    >
      <span className={`${getRankNumberSize(rank)}`}>{rank}</span>
      <div className="flex items-center ml-4">{avatar}</div>
      <div className="flex flex-col">
        <span className={`${rank === 1 && "text-2xl"}`}>{username}</span>
        <span
          className={`${isDesktop && "hidden"} text-sm text-secondary-customGray`}
        >
          {achievementsUnlocked}/{totalAchievements}
        </span>
      </div>
      <div className={`ml-auto ${isDesktop ? "visible" : "hidden"}`}>
        <span className="font-display text-tertiary-default">
          {achievementsUnlocked} ACHIEVEMENTS
        </span>
      </div>
    </Card>
  );
};
