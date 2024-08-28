import { DiscordIcon } from "../../atoms/icons/DiscordIcon";

export const DiscordSignInButton = () => {
  const loginURL = import.meta.env.VITE_API_LOGIN_URL ?? "";
  return (
    <div
      onClick={() => (window.location.href = loginURL)}
      className="flex items-center justify-center gap-2 p-2 bg-blue-600 rounded cursor-pointer  h-11"
    >
      <DiscordIcon />
      <h3 className="text-sm font-medium text-white font-display">SIGN IN</h3>
    </div>
  );
};
