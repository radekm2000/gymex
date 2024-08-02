import { Link, useLocation } from "wouter";
import { RoutePath } from "../../constants/navigation";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { FadingTooltip } from "../atoms/tooltip/FadingTooltip";

export const Sidebar = () => {
  const [, navigate] = useLocation(); // Get the navigate function

  const handleNavigation = (url: string) => {
    navigate(url); // Navigate to the URL
  };
  return (
    <div className="h-full text-white border-r border-primary-light">
      <div className="block p-4">
        <FadingTooltip>
          <span
            onClick={() => handleNavigation(RoutePath.MainPage)}
            className="block mb-2 hover:cursor-pointer"
          >
            main Page1233
          </span>
        </FadingTooltip>
        <FadingTooltip tooltipText="test page">
          <span
            onClick={() => handleNavigation(RoutePath.Test)}
            className="block mb-2 hover:cursor-pointer"
          >
            test Page
          </span>
        </FadingTooltip>
        <Link href="/aaaaaaaa">
          <span className="block mb-2">default Page</span>
        </Link>
      </div>
    </div>
  );
};
