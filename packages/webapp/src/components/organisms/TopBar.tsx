import { useAuth } from "../../hooks/use-auth";
import { formatUrlToUi } from "../../hooks/utils/formatUrlToUi";
import { HamburgerMenu } from "../atoms/HamburgerMenu";
import { UserAvatar } from "../atoms/icons/UserAvatar";
import { DiscordSignInButton } from "../molecules/discord/DiscordSignInButton";

type Props = {
  currentUrlLocation: string;
  toggleSheet: () => void;
};

export const TopBar = ({ currentUrlLocation, toggleSheet }: Props) => {
  const { user } = useAuth();
  const { avatar, discordId } = user.model.discordConnection;
  return (
    <div className="flex items-center justify-between p-2 border-b border-primary-light min-h-16 max-h-16">
      <div className="hidden md:block">
        {currentUrlLocation && (
          <div className="px-5 text-3xl text-white font-display">
            {formatUrlToUi(currentUrlLocation)}
          </div>
        )}
      </div>
      <div className="md:hidden">
        <HamburgerMenu toggleSheet={toggleSheet} />
      </div>
      <div className="mr-4">
        {avatar && discordId ? (
          <UserAvatar discordAvatarId={avatar} discordUserId={discordId} />
        ) : (
          <DiscordSignInButton />
        )}
      </div>
    </div>
  );
};
