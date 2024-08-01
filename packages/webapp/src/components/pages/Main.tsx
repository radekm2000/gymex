import { useAuth } from "../../hooks/use-auth";
import { UserAvatar } from "../atoms/icons/UserAvatar";
import { DiscordSignInButton } from "../molecules/discord/DiscordSignInButton";

export const Main = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="flex justify-center items-center min-h-screen gap-10">
      <h1 className="text-white">test123</h1>
      <DiscordSignInButton />
      <UserAvatar
        discordAvatarId={user.model.discordConnection.avatar}
        discordUserId={user.model.discordConnection.discordId}
      />
    </div>
  );
};
