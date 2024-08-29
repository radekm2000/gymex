import { useQuery } from "@tanstack/react-query";
import { useWorkoutStore } from "../../../hooks/utils/useWorkoutStore";
import { Card } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { CreateTrainingExerciseHeader } from "../training-plans/CreateTrainingExerciseHeader";
import { CreateTrainingExerciseSetsList } from "../training-plans/CreateTrainingExerciseSetsList";
import {
  ExercisesQueryKeys,
  getExerciseModel,
} from "../../../api/requests/exercises";
import { LoadingProgress } from "../utils/LoadingProgress";

export const ActiveWorkoutContent = () => {
  const {
    activeWorkoutModel: trainingPlan,
    addSet,
    deleteSet,
    updateReps,
    updateWeight,
  } = useWorkoutStore();

  const firstExercise = trainingPlan.exercises[0];

  const { data: exercise, isLoading } = useQuery({
    queryKey: ExercisesQueryKeys.detail(firstExercise?.id),
    queryFn: () => getExerciseModel(firstExercise.id),
    enabled: !!firstExercise,
  });

  if (isLoading) {
    return <LoadingProgress />;
  }
  console.log(trainingPlan);

  return (
    firstExercise &&
    exercise && (
      <Card className="flex flex-col gap-2 p-3 sm:p-4 bg-textInput-light">
        <CreateTrainingExerciseHeader
          exerciseId={firstExercise.id}
          exerciseName={firstExercise.exerciseName}
          onDelete={() => {}}
          primaryMuscleTargeted={exercise.primaryMuscleTargeted}
          restTime={exercise.restTime}
        />
        <div>
          <Separator />
        </div>

        <CreateTrainingExerciseSetsList
          exerciseFromWorkout={firstExercise}
          exerciseId={firstExercise.id}
          onSetAdd={addSet}
          onSetDelete={deleteSet}
          updateReps={updateReps}
          updateWeight={updateWeight}
        />
      </Card>
    )
  );
};
