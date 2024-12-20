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
    <Button
      variant={"default"}
      className="w-full rounded-lg size-auto border-primary-light bg-secondary-light"
      onClick={handleOnClick}
    >
      <div className="flex flex-col">
        {icon}
        <div className="justify-center w-full rounded-none rounded-b-sm ">
          <span className="text-xl text-center text-white font-display">
            {name}
          </span>
        </div>
      </div>
    </Button>
  );
};
