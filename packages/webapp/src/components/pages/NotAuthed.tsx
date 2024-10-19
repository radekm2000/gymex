import { RoutePath } from "../../constants/navigation";
import { Logo } from "../atoms/icons/Logo";
import { SidebarLinkButton } from "../atoms/sidebar/SidebarLinkButton";

export const NotAuthed = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <SidebarLinkButton
        path={RoutePath.Profile}
        isLogo={true}
        name="logo"
        icon={<Logo />}
      />
      <span className="text-white font-display">
        Sign in to access this content
      </span>
    </div>
  );
};
