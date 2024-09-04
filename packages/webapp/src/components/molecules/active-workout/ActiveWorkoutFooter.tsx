/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation } from "wouter";
import { Button } from "../../ui/button";
import { RoutePath, SET_LOCATION_STATES } from "../../../constants/navigation";
import { useWorkoutStore } from "../../../hooks/utils/useWorkoutStore";
import { AddExerciseToWorkout } from "@gymex/commons/src";

type Props = {
  activeExercise: AddExerciseToWorkout;
};

export const ActiveWorkoutFooter = ({ activeExercise }: Props) => {
  const [, setLocation] = useLocation();

  const { activeWorkoutModel, addSet, deleteSet } = useWorkoutStore();
  return (
    <div className="flex gap-2 -ml-2 row">
      <Button
        onClick={() => addSet(activeExercise.id)}
        size={"sm"}
        className="basis-1/3 bg-primaryButton-create hover:bg-primaryButton-create bg-opacity-70 hover:bg-opacity-70"
      >
        Add set
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
        className="basis-1/3"
        size={"sm"}
      >
        Add exercise
      </Button>
      <Button
        onClick={() => deleteSet(activeExercise.id)}
        size={"sm"}
        className="mr-6 basis-1/3 bg-primaryButton-delete hover:bg-primaryButton-delete"
      >
        Delete set
      </Button>
    </div>
  );
};
