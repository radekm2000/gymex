import { DiscordIcon } from "../../atoms/icons/DiscordIcon";

export const DiscordSignInButton = () => {
  const loginURL = import.meta.env.VITE_API_LOGIN_URL ?? "";
  return (
    <div className="flex p-2 bg-blue-600 rounded  justify-center">
      <a href={loginURL} className="flex items-center gap-2 ">
        <DiscordIcon />
        <h3 className="font-display text-sm text-white font-medium">SIGN IN</h3>
      </a>
    </div>
  );
};
