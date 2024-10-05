import { Card } from "../ui/card";
import { useAuth } from "../../hooks/use-auth";
import { UserAvatar } from "../atoms/icons/UserAvatar";
import { useMediaQuery } from "usehooks-ts";
import { AchievementsList } from "../molecules/achievements/AchievementsList";
import { CircleUser } from "lucide-react";
import { BadgesCard } from "../molecules/profile/BadgesCard";

export const Profile = () => {
  const { user, isAuthed } = useAuth();
  const { avatar, discordId } = user.model.discordConnection;

  const over1200 = useMediaQuery("(min-width: 1024px)");

  return (
    <div className={`flex ${over1200 ? "flex" : "flex-col"} gap-6 mt-4 w-full`}>
      <div className="flex flex-col gap-6">
        <Card
          className={` ${over1200 ? "w-[300px]" : ""} flex flex-col items-center justify-center gap-4 p-4 ${over1200 ? "h-[300px]" : ""}`}
        >
          {avatar && discordId ? (
            <UserAvatar
              size={over1200 ? "24" : "20"}
              discordAvatarId={avatar}
              discordUserId={discordId}
            />
          ) : (
            <CircleUser size={over1200 ? "96" : "80"} />
          )}

          <span>{isAuthed ? user.model.user.username : "GUEST"}</span>
        </Card>
        {isAuthed ? (
          <BadgesCard />
        ) : (
          <Card
            className={`flex flex-col gap-4 ${over1200 ? "w-[300px]" : ""} `}
          >
            {" "}
            <span className="mr-auto text-xl font-display">Badges</span>
            <span className="text-secondary-customGray">
              SIGN IN TO SEE BADGES
            </span>
          </Card>
        )}
      </div>
      <AchievementsList />
    </div>
  );
};
