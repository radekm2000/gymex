import { ReactNode } from "react";
import { RoutePath, SET_LOCATION_STATES } from "../../../constants/navigation";
import { useLocation } from "wouter";
import { Button } from "../../ui/button";
import { useHistoryState } from "wouter/use-browser-location";
import { WorkoutCreateSchema } from "@gymex/commons/src";

type Props = {
  icon?: ReactNode;
  name: string;
  path?: RoutePath | string;
};

export const ExerciseLinkButton = ({ icon, name, path }: Props) => {
  const [, setLocation] = useLocation();
  const state = useHistoryState();
  const mode = state?.mode;
  const workout: WorkoutCreateSchema = state?.workout;
  const handleOnClick = () => {
    if (mode === SET_LOCATION_STATES.ADD_EXERCISE_TO_ACTIVE_WORKOUT && path) {
      setLocation(path, {
        state: {
          mode: SET_LOCATION_STATES.ADD_EXERCISE_TO_ACTIVE_WORKOUT,
          activeWorkout: workout,
        },
      });
    } else if (path && workout) {
      setLocation(path, {
        state: {
          mode: SET_LOCATION_STATES.ADD_EXERCISE_TO_TRAINING_PLAN,
          workout,
        },
      });
    } else {
      path &&
        setLocation(path, {
          state: {
            mode: SET_LOCATION_STATES.NORMAL_MODE,
          },
        });
    }
  };

  return (
    <div className="flex rounded-full">
      <div className="flex flex-col items-center w-full h-full gap-4 ">
        <Button
          variant={"default"}
          className="w-full h-32 lg:size-60 border-1 border-primary-light "
          onClick={handleOnClick}
        >
          {icon}
        </Button>
        <span className="text-xl text-center text-white text font-display">
          {name}
        </span>
      </div>
    </div>
  );
};
