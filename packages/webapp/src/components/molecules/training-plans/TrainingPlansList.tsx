import { DetailedWorkoutModel } from "@gymex/commons/src";

type Props = {
  trainingPlans: DetailedWorkoutModel[];
};

export const TrainingPlansList = ({ trainingPlans }: Props) => {
  return (
    <div>
      {trainingPlans.map((p, index) => (
        <div key={index}>{p.workout.name}</div>
      ))}
    </div>
  );
};
