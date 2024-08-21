import { RoutePath } from "../../constants/navigation";
import { GithubIcon } from "../atoms/icons/GithubIcon";
import { Logo } from "../atoms/icons/Logo";
import { SidebarLinkButton } from "../atoms/sidebar/SidebarLinkButton";
import { Ambulance, DumbbellIcon, NotepadText, Store } from "lucide-react";

export const SidebarLinks = () => {
  return (
    <div className="flex flex-col h-full gap-4 mx-2 place-items-center">
      <SidebarLinkButton isLogo={true} name="logo" icon={<Logo />} />

      <SidebarLinkButton
        name="Exercises"
        path={RoutePath.Exercises}
        icon={<DumbbellIcon size={22} />}
      />
      <SidebarLinkButton
        name="Main Page"
        path={RoutePath.MainPage}
        icon={<Store size={22} />}
      />
      <SidebarLinkButton
        name="Test Page"
        path={RoutePath.Test}
        icon={<Ambulance size={22} />}
      />

      <SidebarLinkButton
        name="Training plans"
        path={RoutePath.TrainingPlans}
        icon={<NotepadText size={22} />}
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
