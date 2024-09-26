import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LoadingProgress } from "../../molecules/utils/LoadingProgress";

type UserAvatarProps = {
  discordUserId: string;
  discordAvatarId: string;
  size?: string;
};

export const UserAvatar = ({
  discordUserId,
  discordAvatarId,
  size,
}: UserAvatarProps) => {
  const url = `https://cdn.discordapp.com/avatars/${discordUserId}/${discordAvatarId}.png`;
  if (!discordAvatarId || !discordUserId) {
    return;
  }
  return (
    <Avatar>
      <AvatarImage
        className={`${size ? `size-${size}` : "size-11"}  rounded-full`}
        src={url}
      ></AvatarImage>
      <AvatarFallback>
        <LoadingProgress />
      </AvatarFallback>
    </Avatar>
  );
};
