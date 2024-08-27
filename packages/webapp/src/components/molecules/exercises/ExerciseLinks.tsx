import { ExerciseModel, WorkoutCreateSchema } from "@gymex/commons/src";
import { DumbbellIcon, Trash2 } from "lucide-react";
import { Card } from "../../ui/card";
import { useExerciseDeleteMutation } from "../../../api/mutations/exercises";
import { Button } from "../../ui/button";
import { useHistoryState } from "wouter/use-browser-location";
import { useLocation } from "wouter";
import { RoutePath } from "../../../constants/navigation";

type Props = {
  exercises: ExerciseModel[];
};

export const ExerciseLinks = ({ exercises }: Props) => {
  const [location, setLocation] = useLocation();
  const state = useHistoryState();
  //mode addExerciseToWorkoutPlan
  const mode = state?.mode;
  const workout: WorkoutCreateSchema = state?.workout;

  const isMyExercisesPage = location === RoutePath.MyExercises;

  const deleteMutation = useExerciseDeleteMutation();

  const onDelete = (exerciseId: number) => {
    deleteMutation.mutate({ exerciseId });
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
                <DumbbellIcon className=" text-secondary-veryLight" />
                <span className="text-lg font-display">{e.exerciseName}</span>
              </div>
              {isMyExercisesPage && (
                <Button onClick={() => onDelete(e.id)} variant={"destructive"}>
                  <Trash2 />
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
