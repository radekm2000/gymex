import {
  DetailedWorkoutModel,
  WorkoutExerciseSetsWithoutPlanAndExerciseIds,
} from "@gymex/commons/src";
import { Separator } from "../../ui/separator";
import dumbell from "../../../assets/dumbell.png";
import { CustomIcon } from "../../atoms/icons/CustomIcon";
import { Card } from "../../ui/card";

type Props = {
  trainingPlan: DetailedWorkoutModel;
};
export const WorkoutSummaryStatsDescription = ({ trainingPlan }: Props) => {
  const displayExerciseSets = (
    sets: WorkoutExerciseSetsWithoutPlanAndExerciseIds[]
  ) => {
    return (
      <div>
        {sets.map((s, index) => (
          <span className="text-expandedContent-secondaryText" key={index}>
            {s.reps}x{s.weight}kg,&nbsp;
          </span>
        ))}
      </div>
    );
  };

  return (
    <Card className="flex flex-col gap-2 bg-exerciseCard-background">
      {trainingPlan.exercises.map((e, index) => (
        <>
          <div key={index} className="flex items-center gap-4">
            <div className="pl-2">
              <CustomIcon icon={dumbell} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display text-expandedContent-primaryText ">
                {e.exerciseName}
              </span>
              {displayExerciseSets(e.sets)}
            </div>
          </div>
          <Separator />
        </>
      ))}
    </Card>
  );
};
