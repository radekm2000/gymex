import { RoutePath } from "../../constants/navigation";
import { CustomIcon } from "../atoms/icons/CustomIcon";
import { GithubIcon } from "../atoms/icons/GithubIcon";
import { Logo } from "../atoms/icons/Logo";
import { SidebarLinkButton } from "../atoms/sidebar/SidebarLinkButton";
import {
  CalendarDays,
  DumbbellIcon,
  NotepadText,
  Settings,
  UserRound,
} from "lucide-react";
import leaderboard from "../../assets/leaderboard.png";

export const SidebarLinks = () => {
  return (
    <div className="flex flex-col h-full gap-4 mx-2 place-items-center">
      <SidebarLinkButton
        isLogo={true}
        name="logo"
        icon={<Logo />}
        className="cursor-pointer"
      />

      <SidebarLinkButton
        name="Profile"
        path={RoutePath.Profile}
        icon={<UserRound size={22} />}
      />

      <SidebarLinkButton
        name="Exercises"
        path={RoutePath.Exercises}
        icon={<DumbbellIcon size={22} />}
      />
      <SidebarLinkButton
        name="Training plans"
        path={RoutePath.TrainingPlans}
        icon={<NotepadText size={22} />}
        dynamicPath
      />

      <SidebarLinkButton
        name="Leaderboard"
        path={RoutePath.Leaderboard}
        icon={<CustomIcon height={22} width={22} icon={leaderboard} />}
      />

      <SidebarLinkButton
        name="History"
        path={RoutePath.WorkoutsHistory}
        icon={<CalendarDays size={22} />}
      />

      <SidebarLinkButton
        name="Settings"
        path={RoutePath.Settings}
        icon={<Settings size={22} />}
      />

      <div className="pb-1 mt-auto">
        <SidebarLinkButton
          path={RoutePath.Github}
          isLogo={true}
          name="Github"
          icon={<GithubIcon width={40} height={40} />}
        />
      </div>
    </div>
  );
};
