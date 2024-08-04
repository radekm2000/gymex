import { DumbbellIcon } from "lucide-react";
import { PrimaryButton } from "../atoms/inputs/PrimaryButton";
import { DiscordSignInButton } from "../molecules/discord/DiscordSignInButton";

export const Main = () => {
  return (
    <div className="flex items-center gap-10 py-10 mx-10 bg-primary">
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
