import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Info, SaveIcon } from "lucide-react";
import { LabeledInput } from "../atoms/inputs/LabeledInput";
import { PrimaryButton } from "../atoms/inputs/PrimaryButton";
import {
  ExerciseWithoutExerciseName,
  initialWorkout,
  WorkoutCreateDtoSchemaWithoutExerciseName,
  WorkoutCreateSchema,
} from "@gymex/commons/src";
import { Button } from "../ui/button";
import { useLocation } from "wouter";
import { RoutePath } from "../../constants/navigation";
import { useHistoryState } from "wouter/use-browser-location";
import { useWorkoutPlanCreateMutation } from "../../api/mutations/workouts";

export const AddTrainingPlan = () => {
  const [, setLocation] = useLocation();
  const state = useHistoryState();

  const [workout, setWorkout] = useState<WorkoutCreateSchema>(
    (state?.updatedWorkout as WorkoutCreateSchema) || initialWorkout
  );

  const workoutExercises = workout.exercises;

  useEffect(() => {
    if (state?.mode === "addExerciseToTrainingPlan") {
      setWorkout(state.updatedWorkout as WorkoutCreateSchema);
    }
  }, [state?.mode, state?.updatedWorkout]);

  const handleWorkoutNameChange = (newWorkoutName: string) => {
    setWorkout((prev) => ({
      ...prev,
      workoutName: newWorkoutName,
    }));
  };

  const createMutation = useWorkoutPlanCreateMutation();

  const onCreate = () => {
    if (workout && workout.exercises) {
      const filteredExercises =
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        workout.exercises.map(({ exerciseName, ...rest }) => ({
          id: rest.id,
          notes: rest.notes ?? "",
          orderIndex: rest.orderIndex,
          sets: rest.sets,
        }));
      const workoutForMutation: WorkoutCreateDtoSchemaWithoutExerciseName = {
        workoutName: workout.workoutName,
        exercises: filteredExercises,
      };
      createMutation.mutate(workoutForMutation);
    }
  };
  return (
    <Card className="flex flex-col gap-2">
      <CardTitle className="flex gap-4">
        <Info />
        <span>Add plan</span>
        <div className="ml-auto">
          <PrimaryButton
            onClick={onCreate}
            tooltipMessage="Add plan name and exercises"
            disabled={workout.exercises.length < 1 || !workout.workoutName}
            buttonMessage="SAVE"
            buttonIcon={<SaveIcon />}
          />
        </div>
      </CardTitle>
      <div className="gap-4 pt-3">
        <LabeledInput
          label="Training plan name"
          inputValue={workout.workoutName}
          onInputValueChange={handleWorkoutNameChange}
        />
      </div>
      <CardContent className="flex items-center justify-center pt-15">
        {workoutExercises.length < 0 && (
          <span className="text-white font-display">
            Add exercises to your training plan
          </span>
        )}
        <Button
          onClick={() =>
            setLocation(RoutePath.MyExercises, {
              state: {
                mode: "addExerciseToTrainingPlan",
                workout,
              },
            })
          }
        >
          click me
        </Button>
      </CardContent>
    </Card>
  );
};
