import { ReactNode } from "react";
import { RoutePath } from "../../../constants/navigation";
import { useLocation } from "wouter";
import { FadingTooltip } from "../tooltip/FadingTooltip";
import { Button } from "../../ui/button";

type Props = {
  name: string;
  icon?: ReactNode;
  path?: RoutePath;
  disabled?: boolean;
  isLogo?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SidebarLinkButton = ({
  name,
  icon,
  path,
  disabled,
  isLogo,
  ...props
}: Props) => {
  const [location, setLocation] = useLocation();

  const isActive = (() => {
    return path === location || (path && location.includes(path));
  })();
  if (isLogo) {
    return (
      <Button
        size={"logo"}
        className={`opacity-100`}
        variant={isActive ? "active" : "none"}
        disabled={disabled}
        {...props}
        onClick={() => {
          if (!disabled) {
            if (path?.startsWith("http")) {
              window.location.href = path;
            } else {
              path && setLocation(path);
            }
          }
        }}
      >
        {icon}
      </Button>
    );
  }
  return (
    <FadingTooltip tooltipPlacement="right" tooltipText={name}>
      <Button
        size={"icon"}
        className={` hover:bg-primary-light text-secondary-veryLight ${isActive ? "opacity-100" : "opacity-60"}`}
        variant={isActive ? "active" : "none"}
        disabled={disabled}
        {...props}
        onClick={() => {
          if (!disabled) {
            path && setLocation(path, { replace: false });
          }
        }}
      >
        {icon}
      </Button>
    </FadingTooltip>
  );
};
