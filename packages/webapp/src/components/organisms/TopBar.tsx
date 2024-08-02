import { useAuth } from "../../hooks/use-auth";
import { formatUrlToUi } from "../../hooks/utils/formatUrlToUi";
import { UserAvatar } from "../atoms/icons/UserAvatar";
import { DiscordSignInButton } from "../molecules/discord/DiscordSignInButton";

type Props = {
  currentUrlLocation: string;
};

export const TopBar = ({ currentUrlLocation }: Props) => {
  const { user } = useAuth();
  const { avatar, discordId } = user.model.discordConnection;
  return (
    <div className="flex justify-between items-center border-b border-primary-light p-2 min-h-16 max-h-16">
      <div>
        {currentUrlLocation && (
          <div className="px-5 text-white text-5xl">
            {formatUrlToUi(currentUrlLocation)}
          </div>
        )}
      </div>
      <div className="mr-2">
        {avatar && discordId ? (
          <UserAvatar discordAvatarId={avatar} discordUserId={discordId} />
        ) : (
          <DiscordSignInButton />
        )}
      </div>
    </div>
  );
};
