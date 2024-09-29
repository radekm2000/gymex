import { ACHIEVEMENTS } from "@gymex/commons/src";
import { UserAvatar } from "../atoms/icons/UserAvatar";
import { Separator } from "../ui/separator";
import { LeaderboardUserCard } from "../molecules/leaderboard/LeaderboardUserCard";
import { useQuery } from "@tanstack/react-query";
import {
  getUsersLeaderboardInfo,
  UserQueryKeys,
} from "../../api/requests/user";
import { LoadingProgress } from "../molecules/utils/LoadingProgress";

export const Leaderboard = () => {
  const { data: users, isLoading } = useQuery({
    queryFn: getUsersLeaderboardInfo,
    queryKey: UserQueryKeys.leaderboard(),
  });

  if (isLoading || !users) {
    return <LoadingProgress />;
  }

  const usersWithAchievementsUnlocked = users?.map((u) => {
    const achievements = u.stats.achievements;
    const achievementsUnlocked = Object.values(achievements).filter(
      (a) => a.unlocked
    ).length;
    return {
      ...u,
      achievementsUnlocked,
    };
  });

  const totalAchievements = Object.keys(ACHIEVEMENTS).length;
  const sortedUsers = usersWithAchievementsUnlocked?.sort(
    (a, b) => b.achievementsUnlocked - a.achievementsUnlocked
  );

  return (
    <>
      <span className="mb-2 text-secondary-veryLight">
        Total Achievements Available: {totalAchievements}
      </span>
      <div className="w-full mt-4 rounded-lg bg-primary">
        <div className="flex flex-col w-full gap-4">
          {sortedUsers.map((user, index) => {
            const rank = index + 1;
            return (
              <>
                <LeaderboardUserCard
                  totalAchievements={totalAchievements}
                  rank={rank}
                  username={user.user.username}
                  achievementsUnlocked={user.achievementsUnlocked}
                  avatar={
                    <UserAvatar
                      discordAvatarId={user.discordConnection.avatar}
                      discordUserId={user.discordConnection.discordId}
                    />
                  }
                />
                {index !== sortedUsers.length - 1 && <Separator />}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
