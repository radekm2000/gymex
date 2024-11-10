import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Info, SaveIcon } from "lucide-react";
import { LabeledInput } from "../atoms/inputs/LabeledInput";
import { PrimaryButton } from "../atoms/inputs/PrimaryButton";
import {
  initialWorkout,
  WorkoutCreateDtoSchemaWithoutExerciseName,
  WorkoutCreateSchema,
} from "@gymex/commons/src";
import { Button } from "../ui/button";
import { useLocation } from "wouter";
import { RoutePath } from "../../constants/navigation";
import { useHistoryState } from "wouter/use-browser-location";
import { useWorkoutPlanCreateMutation } from "../../api/mutations/workouts";
import { TrainingExerciseList } from "../molecules/training-plans/TrainingExerciseList";

export const AddTrainingPlan = () => {
  const [, setLocation] = useLocation();
  const state = useHistoryState();

  const [workout, setWorkout] = useState<WorkoutCreateSchema>(
    (state?.updatedWorkout as WorkoutCreateSchema) || initialWorkout
  );

  console.log(workout);

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
          restTime: rest.restTime,
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
    <Card className="flex flex-col gap-2 mb-6">
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
      <CardContent className="flex flex-col items-center justify-center pt-15">
        {workoutExercises.length < 0 && (
          <span className="text-white font-display">
            Add exercises to your training plan
          </span>
        )}
        <div className="w-full mr-auto">
          {workoutExercises && workoutExercises.length > 0 && (
            <TrainingExerciseList
              workout={workout}
              setWorkout={setWorkout}
              exercises={workout.exercises}
            />
          )}
        </div>
        <Button
          className="mt-10 ml-auto"
          onClick={() =>
            setLocation(RoutePath.Exercises, {
              state: {
                mode: "addExerciseToTrainingPlan",
                workout,
              },
            })
          }
        >
          Add exercise
        </Button>
      </CardContent>
    </Card>
  );
};
