import { Link, useLocation } from "wouter";
import { RoutePath } from "../../constants/navigation";
import { FadingTooltip } from "../atoms/tooltip/FadingTooltip";

export const SidebarLinks = () => {
  const [, navigate] = useLocation(); // Get the navigate function

  const handleNavigation = (url: string) => {
    navigate(url); // Navigate to the URL
  };
  return (
    <div className="flex flex-col p-4">
      <FadingTooltip tooltipText="test123">
        <span
          onClick={() => handleNavigation(RoutePath.MainPage)}
          className="block mb-2 hover:cursor-pointer hover:bg-red-500"
        >
          main Page1233
        </span>
      </FadingTooltip>
      <FadingTooltip tooltipText="test page">
        <span
          onClick={() => handleNavigation(RoutePath.Test)}
          className="justify-center block mb-2 hover:cursor-pointer hover:bg-red-500"
        >
          test Page
        </span>
      </FadingTooltip>
      <Link href="/aaaaaaaa">
        <span className="block mb-2">default Page</span>
      </Link>
    </div>
  );
};
