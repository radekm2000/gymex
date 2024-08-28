import { DetailedWorkoutModel } from "@gymex/commons/src";
import { TrainingPlanCard } from "./TrainingPlanCard";

type Props = {
  trainingPlans: DetailedWorkoutModel[];
};

export const TrainingPlansList = ({ trainingPlans }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {trainingPlans.map((p, index) => (
        <TrainingPlanCard key={index} trainingPlan={p} />
      ))}
    </div>
  );
};
