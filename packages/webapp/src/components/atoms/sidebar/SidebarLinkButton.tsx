import { ReactNode } from "react";
import { RoutePath } from "../../../constants/navigation";
import { useLocation } from "wouter";
import { FadingTooltip } from "../tooltip/FadingTooltip";
import { Button } from "../../ui/button";
import { useWorkoutStore } from "../../../hooks/utils/useWorkoutStore";

type Props = {
  name: string;
  icon?: ReactNode;
  path?: RoutePath;
  disabled?: boolean;
  isLogo?: boolean;
  dynamicPath?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SidebarLinkButton = ({
  name,
  icon,
  path,
  disabled,
  isLogo,
  dynamicPath,
  ...props
}: Props) => {
  const [location, setLocation] = useLocation();

  const { activeWorkoutModel } = useWorkoutStore();

  const isDynamicPathActive = (() => {
    return (
      (dynamicPath && path && location.includes("active-workout")) ||
      (path && location.includes(path))
    );
  })();

  const isActive = (() => {
    return path === location || (path && location.includes(path));
  })();
  if (isLogo) {
    return (
      <Button
        size={"logo"}
        className={`flex-shrink-0 opacity-100`}
        variant={isActive ? "active" : "none"}
        disabled={disabled}
        {...props}
        onClick={() => {
          if (!disabled) {
            if (path?.startsWith("http")) {
              window.location.href = path;
            } else if (path) {
              setLocation(path);
            } else {
              setLocation(RoutePath.Profile);
            }
          }
        }}
      >
        {icon}
      </Button>
    );
  } else if (dynamicPath) {
    return (
      <FadingTooltip tooltipPlacement="right" tooltipText={name}>
        <Button
          size={"icon"}
          className={`flex-shrink-0 hover:bg-primary-light text-secondary-veryLight ${isDynamicPathActive ? "opacity-100" : "opacity-60"}`}
          variant={isDynamicPathActive ? "active" : "none"}
          disabled={disabled}
          {...props}
          onClick={() => {
            if (!disabled) {
              if (activeWorkoutModel.workout.id !== 0 && dynamicPath) {
                setLocation(
                  `/active-workout/${activeWorkoutModel.workout.id}`,
                  {
                    state: {
                      workoutModdel: activeWorkoutModel,
                      setWorkoutModelUpdatedToTrue: true,
                    },
                  }
                );
              } else {
                path && setLocation(path, { replace: false });
              }
            }
          }}
        >
          {icon}
        </Button>
      </FadingTooltip>
    );
  }
  return (
    <FadingTooltip tooltipPlacement="right" tooltipText={name}>
      <Button
        size={"icon"}
        className={` flex-shrink-0 hover:bg-primary-light text-secondary-veryLight ${isActive ? "opacity-100" : "opacity-60"}`}
        variant={isActive ? "active" : "none"}
        disabled={disabled}
        {...props}
        onClick={() => {
          if (!disabled) {
            if (activeWorkoutModel.workout.id !== 0 && dynamicPath) {
              setLocation(`/active-workout/${activeWorkoutModel.workout.id}`, {
                state: {
                  workoutModdel: activeWorkoutModel,
                  setWorkoutModelUpdatedToTrue: true,
                },
              });
            } else {
              path && setLocation(path, { replace: false });
            }
          }
        }}
      >
        {icon}
      </Button>
    </FadingTooltip>
  );
};
