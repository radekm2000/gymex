import { DumbbellIcon } from "lucide-react";
import { PrimaryButton } from "../atoms/inputs/PrimaryButton";
import { DiscordSignInButton } from "../molecules/discord/DiscordSignInButton";

export const Profile = () => {
  return (
    <div className="flex items-center justify-center gap-4 py-10 border rounded shadow-sm bg-primary border-primary-light">
      <h1 className="text-white">test123</h1>
      <DiscordSignInButton />
      <PrimaryButton
        buttonIcon={<DumbbellIcon />}
        tooltipMessage="tooltip msg"
        disableOnNotAuthed={true}
      />
    </div>
  );
};
