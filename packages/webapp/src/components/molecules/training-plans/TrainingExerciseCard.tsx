import { useQuery } from "@tanstack/react-query";
import {
  ExercisesQueryKeys,
  getExerciseModel,
} from "../../../api/requests/exercises";
import { LoadingProgress } from "../utils/LoadingProgress";
import { Card } from "../../ui/card";
import { DumbbellIcon, Trash2 } from "lucide-react";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { ExerciseSet, WorkoutCreateSchema } from "@gymex/commons/src";
import { useState } from "react";
import { Input } from "../../ui/input";

type Props = {
  exerciseId: number;
  setWorkout: React.Dispatch<React.SetStateAction<WorkoutCreateSchema>>;
  workout: WorkoutCreateSchema;
};

export const TrainingExerciseCard = ({
  exerciseId,
  setWorkout,
  workout,
}: Props) => {
  const { data: exercise, isLoading } = useQuery({
    queryKey: ExercisesQueryKeys.detail(exerciseId),
    queryFn: () => getExerciseModel(exerciseId),
  });

  if (isLoading) {
    return <LoadingProgress />;
  }

  const [exerciseFromWorkout] = workout.exercises.filter(
    (e) => e.id === exerciseId
  );

  const onDelete = (exerciseId: number) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((e) => e.id !== exerciseId),
    }));
  };

  const updateWeight = (
    exerciseId: number,
    setId: string,
    newWeight: string
  ) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.map((set) =>
              set.exerciseSetNumber === setId
                ? { ...set, weight: newWeight }
                : set
            ),
          };
        }
        return exercise;
      }),
    }));
  };

  const updateReps = (exerciseId: number, setId: string, newReps: string) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((e) => {
        if (e.id === exerciseId) {
          return {
            ...e,
            sets: e.sets.map((set) =>
              set.exerciseSetNumber === setId
                ? { ...set, reps: newReps, weight: "0" }
                : set
            ),
          };
        }
        return e;
      }),
    }));
  };

  const onSetAdd = (exerciseId: number) => {
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      exercises: prevWorkout.exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const newSet: ExerciseSet = {
            exerciseSetNumber: (exercise.sets.length + 1).toString(),
            reps: "10",
            weight: "0",
          };

          return {
            ...exercise,
            sets: [...exercise.sets, newSet],
          };
        }
        return exercise;
      }),
    }));
  };

  const onSetDelete = (exerciseId: number, setId: string) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.filter(
              (set) => set.exerciseSetNumber !== setId
            ),
          };
        }
        return exercise;
      }),
    }));
  };

  return (
    exercise && (
      <Card className="flex flex-col gap-2 p-3 sm:p-4 bg-textInput-light">
        <div className="flex items-center justify-start gap-6">
          <div>
            <DumbbellIcon className=" text-secondary-veryLight size-6 md:size-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-display text-neutral-950">
              {exercise.exerciseName}
            </span>
            <div className="flex">
              <span className="text-sm text-textInput-default md:text-lg">
                Muscle targeted:
              </span>
              &nbsp;
              <span className="text-sm text-neutral-950 md:text-lg">
                {exercise.primaryMuscleTargeted}
              </span>
            </div>
            <div className="flex">
              <span className="text-sm text-textInput-default md:text-lg">
                Rest time:
              </span>
              &nbsp;
              <span className="text-sm text-neutral-950 md:text-lg">
                {exercise.restTime}
              </span>
            </div>
          </div>
          <div className="ml-auto ">
            <Button
              onClick={() => onDelete(exerciseId)}
              variant={"destructive"}
            >
              <Trash2 className="size-6 md:size-10" />
            </Button>
          </div>
        </div>
        <div>
          <Separator />
        </div>

        {exerciseFromWorkout.sets.map((set, index) => (
          <>
            <div className="flex items-center justify-start">
              <div
                className={`flex flex-col ${exerciseFromWorkout.sets.length > 1 ? "basis-11/12" : "flex-grow"}`}
              >
                {index === 0 && (
                  <div className="flex items-center justify-between px-2 mb-2">
                    <span className="text-sm text-neutral-950 md:text-lg">
                      SETS
                    </span>
                    <span className="text-sm text-neutral-950 md:text-lg">
                      WEIGHT
                    </span>
                    <span className="text-sm text-neutral-950 md:text-lg">
                      REPS
                    </span>
                  </div>
                )}

                <div
                  key={index}
                  className="flex items-center justify-between flex-grow gap-4 p-1 rounded-lg bg-textInput-test"
                >
                  <span className="flex-shrink-0 ml-2 text-lg font-display text-neutral-950">
                    {set.exerciseSetNumber}
                  </span>
                  <Input
                    value={set.weight}
                    onChange={(e) =>
                      updateWeight(
                        exerciseId,
                        set.exerciseSetNumber,
                        e.target.value
                      )
                    }
                    className="w-12 text-center border-0 rounded-md bg-textInput-test focus-visible:ring-[none] text-neutral-950"
                  />

                  <Input
                    value={set.reps}
                    onChange={(e) =>
                      updateReps(
                        exerciseId,
                        set.exerciseSetNumber,
                        e.target.value
                      )
                    }
                    className="w-12 text-center border-0 rounded-md bg-textInput-test focus-visible:ring-[none] text-neutral-950"
                  />
                </div>
              </div>
              {exerciseFromWorkout.sets.length > 1 &&
                index === exerciseFromWorkout.sets.length - 1 && (
                  <div className="flex-shrink-0 ml-auto">
                    <Button
                      onClick={() =>
                        onSetDelete(exerciseId, set.exerciseSetNumber)
                      }
                      variant={"destructive"}
                      className="p-1 md:p-2"
                    >
                      <Trash2 className="size-4 sm:size-6" />
                    </Button>
                  </div>
                )}
            </div>
          </>
        ))}
        <Button
          className="mt-3 ml-auto md:min-w-32"
          onClick={() => onSetAdd(exerciseId)}
        >
          Add set
        </Button>
      </Card>
    )
  );
};
