import { RoutePath } from "../../constants/navigation";
import { Logo } from "../atoms/icons/Logo";
import { SidebarLinkButton } from "../atoms/sidebar/SidebarLinkButton";
import { DumbbellIcon, Store } from "lucide-react";

export const SidebarLinks = () => {
  return (
    <div className="flex flex-col gap-4 mx-2 place-items-center">
      <SidebarLinkButton isLogo={true} name="logo" icon={<Logo />} />

      <SidebarLinkButton
        name="Test Page"
        path={RoutePath.Test}
        icon={<DumbbellIcon size={22} />}
      />
      <SidebarLinkButton
        name="Main Page"
        path={RoutePath.MainPage}
        icon={<Store size={22} />}
      />
    </div>
  );
};
