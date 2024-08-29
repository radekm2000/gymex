/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation } from "wouter";
import { Button } from "../../ui/button";
import { RoutePath, SET_LOCATION_STATES } from "../../../constants/navigation";
import { useWorkoutStore } from "../../../hooks/utils/useWorkoutStore";

export const ActiveWorkoutFooter = () => {
  const [, setLocation] = useLocation();

  const { activeWorkoutModel, addExercise, addSet, deleteSet } =
    useWorkoutStore();
  return (
    <div className="flex items-center justify-between">
      <Button
        size={"sm"}
        className="flex-grow bg-primaryButton-create hover:bg-primaryButton-create bg-opacity-70 hover:bg-opacity-70"
      >
        add set
      </Button>
      <Button
        onClick={() =>
          setLocation(RoutePath.Exercises, {
            state: {
              mode: SET_LOCATION_STATES.ADD_EXERCISE_TO_ACTIVE_WORKOUT,
              workout: activeWorkoutModel,
            },
          })
        }
        className="flex-grow"
        size={"sm"}
      >
        add exercise
      </Button>
      <Button
        size={"sm"}
        className="flex-grow bg-primaryButton-delete hover:bg-primaryButton-delete"
      >
        delete set
      </Button>
    </div>
  );
};
