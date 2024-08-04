import { PrimaryButton } from "../atoms/inputs/PrimaryButton";
import { DiscordSignInButton } from "../molecules/discord/DiscordSignInButton";

export const Main = () => {
  return (
    <div className="flex gap-10 p-4">
      <h1 className="text-white">test123</h1>
      <DiscordSignInButton />
      <PrimaryButton
        tooltipMessage="tooltip msg"
        tooltipPlacement="top"
        disableOnNotAuthed={true}
      />
    </div>
  );
};
