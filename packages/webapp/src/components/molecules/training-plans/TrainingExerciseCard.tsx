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
import { Input } from "../../ui/input";
import { CreateTrainingExerciseHeader } from "./CreateTrainingExerciseHeader";
import { CreateTrainingExerciseSetsList } from "./CreateTrainingExerciseSetsList";

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
              set.exerciseSetNumber === setId ? { ...set, reps: newReps } : set
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
        <CreateTrainingExerciseHeader
          exerciseId={exerciseId}
          exerciseName={exercise.exerciseName}
          onDelete={onDelete}
          primaryMuscleTargeted={exercise.primaryMuscleTargeted}
          restTime={exercise.restTime}
        />
        <div>
          <Separator />
        </div>

        <CreateTrainingExerciseSetsList
          exerciseFromWorkout={exerciseFromWorkout}
          exerciseId={exerciseId}
          onSetAdd={onSetAdd}
          onSetDelete={onSetDelete}
          updateReps={updateReps}
          updateWeight={updateWeight}
        />
      </Card>
    )
  );
};
