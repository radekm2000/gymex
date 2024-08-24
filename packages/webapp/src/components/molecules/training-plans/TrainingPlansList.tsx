import { DetailedWorkoutModel } from "@gymex/commons/src";
import { useWorkoutPlanDeleteMutation } from "../../../api/mutations/workouts";
import { Button } from "../../ui/button";
import { Trash2 } from "lucide-react";

type Props = {
  trainingPlans: DetailedWorkoutModel[];
};

export const TrainingPlansList = ({ trainingPlans }: Props) => {
  const deleteMutation = useWorkoutPlanDeleteMutation();

  const onDelete = (workoutPlanId: number) => {
    deleteMutation.mutate({ workoutPlanId });
  };

  return (
    <div>
      {trainingPlans.map((p, index) => (
        <div key={index} className="flex justify-between">
          <span>{p.workout.name}</span>
          <Button
            onClick={() => onDelete(p.workout.id)}
            variant={"destructive"}
          >
            <Trash2 />
          </Button>
        </div>
      ))}
    </div>
  );
};
