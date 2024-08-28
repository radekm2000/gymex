import { DetailedWorkoutModel } from "@gymex/commons/src";
import { Card } from "../../ui/card";
import { DeleteButton } from "../../atoms/inputs/DeleteButton";
import { useWorkoutPlanDeleteMutation } from "../../../api/mutations/workouts";

type Props = {
  trainingPlan: DetailedWorkoutModel;
};

export const TrainingPlanCard = ({ trainingPlan }: Props) => {
  const totalExercises = trainingPlan.exercises.length;
  const trainingPlanName = trainingPlan.workout.name;

  const deleteMutation = useWorkoutPlanDeleteMutation();

  const onDelete = (workoutPlanId: number) => {
    deleteMutation.mutate({ workoutPlanId });
  };

  return (
    <Card className="flex items-center justify-between p-3 bg-opacity-50 cursor-pointer hover:bg-opacity-70 sm:p-4 bg-primary-dark">
      <div className="flex flex-col gap-6">
        <span className="text-2xl md:text-3xl font-display ">
          {trainingPlanName}
        </span>
        <div className="flex">
          <span className="text-sm text-textInput-default md:text-lg">
            Total exercises:
          </span>
          &nbsp;
          <span className="text-sm md:text-lg">
            {totalExercises}
          </span>
        </div>
      </div>
      <DeleteButton
        className="px-0"
        onDelete={onDelete}
        iconSize="7"
        iconMdSize="10"
        idToDelete={trainingPlan.workout.id}
      />
    </Card>
  );
};
