/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ActiveWorkoutFinishSchema,
  ExerciseModel,
  WorkoutCreateSchema,
} from "@gymex/commons/src";
import { DumbbellIcon } from "lucide-react";
import { Card } from "../../ui/card";
import { useExerciseDeleteMutation } from "../../../api/mutations/exercises";
import { useHistoryState } from "wouter/use-browser-location";
import { useLocation } from "wouter";
import { RoutePath, SET_LOCATION_STATES } from "../../../constants/navigation";
import { DeleteButton } from "../../atoms/inputs/DeleteButton";
import { useWorkoutStore } from "../../../hooks/utils/useWorkoutStore";
import { BarChart3 } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
type Props = {
  exercises: ExerciseModel[];
};

export const ExerciseLinks = ({ exercises }: Props) => {
  const [location, setLocation] = useLocation();
  const state = useHistoryState();
  const mode = state?.mode;
  const activeWorkout: ActiveWorkoutFinishSchema = state?.activeWorkout;
  const workout: WorkoutCreateSchema = state?.workout;
  const { addExercise } = useWorkoutStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isMyExercisesPage = location === RoutePath.MyExercises;

  const deleteMutation = useExerciseDeleteMutation();

  const onDelete = (exerciseId: number) => {
    deleteMutation.mutate({ exerciseId });
  };

  const onChartIconClick = (exerciseId: number) => {
    setLocation(`/exercises/${exerciseId}/statistics`);
  };

  const handleAddExercise = (exercise: ExerciseModel) => {
    if (mode === "addExerciseToTrainingPlan" && workout) {
      const updatedWorkout = {
        ...workout,
        exercises: [
          ...workout.exercises,
          {
            id: exercise.id,
            exerciseName: exercise.exerciseName,
            notes: "",
            restTime: exercise.restTime,
            sets: [
              {
                exerciseSetNumber: "1",
                reps: "10",
                weight: "0",
                rir: "",
                tempo: "",
                isStaticSet: false,
                holdSecs: "",
              },
            ],
            orderIndex: workout.exercises.length,
          },
        ],
      };

      setLocation(RoutePath.AddTrainingPlan, {
        state: {
          updatedWorkout,
          mode: "addExerciseToTrainingPlan",
        },
      });
    } else if (
      mode === SET_LOCATION_STATES.ADD_EXERCISE_TO_ACTIVE_WORKOUT &&
      activeWorkout
    ) {
      const exerciseExistsInWorkout = activeWorkout.exercises.some(
        (e) => e.id === exercise.id
      );
      if (!exerciseExistsInWorkout) {
        addExercise(exercise);
      }

      setLocation(`/active-workout/${activeWorkout.workout.id}`, {
        state: {
          setWorkoutModelUpdatedToTrue: true,
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-10 bg-primary-dark">
      <Card className="h-full -m-1">
        <div className="flex flex-col gap-4">
          {exercises.map((e, index) => (
            <div
              key={index}
              className="flex justify-between p-2 border-b border-primaryButton-light hover:bg-border-default hover:rounded-md"
            >
              <div
                onClick={() => handleAddExercise(e)}
                className="flex items-center gap-8 cursor-pointer "
              >
                {isDesktop ? (
                  <DumbbellIcon className=" text-secondary-veryLight" />
                ) : null}
                <span className="text-lg font-display">{e.exerciseName}</span>
              </div>

              {mode === SET_LOCATION_STATES.NORMAL_MODE && (
                <div
                  onClick={() => onChartIconClick(e.id)}
                  className="flex items-center ml-auto cursor-pointer"
                >
                  <BarChart3 color="#4bbbe5" />
                </div>
              )}
              {isMyExercisesPage && (
                <DeleteButton
                  className={`${isDesktop ? "" : "px-0 pl-1"}`}
                  idToDelete={e.id}
                  onDelete={onDelete}
                />
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
