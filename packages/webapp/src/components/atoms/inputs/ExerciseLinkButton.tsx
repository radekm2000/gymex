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
  const workout: WorkoutCreateSchema = state?.workout;

  return (
    <div className="flex gap-10">
      <div className="flex flex-col items-center w-full h-full ">
        <Button
          variant={"default"}
          className="w-32 h-32 lg:size-52 border-1 border-primary-light "
          onClick={() =>
            path &&
            setLocation(path, {
              state: {
                mode: SET_LOCATION_STATES.ADD_EXERCISE_TO_TRAINING_PLAN,
                workout,
              },
            })
          }
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
