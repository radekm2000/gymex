import { DetailedWorkoutModel } from "@gymex/commons/src";
import { useWorkoutPlanDeleteMutation } from "../../../api/mutations/workouts";
import { Button } from "../../ui/button";
import { Trash2 } from "lucide-react";
import { DeleteButton } from "../../atoms/inputs/DeleteButton";
import { TrainingPlanCard } from "./TrainingPlanCard";

type Props = {
  trainingPlans: DetailedWorkoutModel[];
};

export const TrainingPlansList = ({ trainingPlans }: Props) => {
  const deleteMutation = useWorkoutPlanDeleteMutation();

  const onDelete = (workoutPlanId: number) => {
    deleteMutation.mutate({ workoutPlanId });
  };

  // return (
  //   <div>
  //     {trainingPlans.map((p, index) => (
  //       <div key={index} className="flex items-center justify-between">
  //         <span>{p.workout.name}</span>
  //         <DeleteButton
  //           className="px-0"
  //           onDelete={onDelete}
  //           idToDelete={p.workout.id}
  //         />
  //       </div>
  //     ))}
  //   </div>
  // );
  return (
    <div className="flex flex-col gap-4">
      {trainingPlans.map((p, index) => (
        <TrainingPlanCard key={index} trainingPlan={p} />
      ))}
    </div>
  );
};
