import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LoadingProgress } from "../../molecules/utils/LoadingProgress";

type UserAvatarProps = {
  discordUserId: string;
  discordAvatarId: string;
};

export const UserAvatar = ({
  discordUserId,
  discordAvatarId,
}: UserAvatarProps) => {
  const url = `https://cdn.discordapp.com/avatars/${discordUserId}/${discordAvatarId}.png`;
  if (!discordAvatarId || !discordUserId) {
    return;
  }
  return (
    <Avatar>
      <AvatarImage className="h-11 rounded-full" src={url}></AvatarImage>
      <AvatarFallback>
        <LoadingProgress />
      </AvatarFallback>
    </Avatar>
  );
};
