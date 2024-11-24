import {
  DetailedWorkoutModel,
  WorkoutExerciseSetsWithoutPlanAndExerciseIds,
} from "@gymex/commons/src";
import { Separator } from "../../ui/separator";
import dumbell from "../../../assets/dumbell.png";
import { CustomIcon } from "../../atoms/icons/CustomIcon";
import { Card } from "../../ui/card";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  trainingPlan: DetailedWorkoutModel;
};
export const WorkoutSummaryStatsDescription = ({ trainingPlan }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const displayExerciseSets = (
    sets: WorkoutExerciseSetsWithoutPlanAndExerciseIds[]
  ) => {
    return (
      <div className="break-all">
        {sets.map((s, index) => (
          <span
            className={`${isDesktop ? null : "text-sm"} text-expandedContent-secondaryText`}
            key={index}
          >
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
          <div key={index} className="flex items-center gap-4 ">
            {isDesktop ? (
              <div className="pl-2 shrink-0">
                <CustomIcon icon={dumbell} />
              </div>
            ) : null}

            <div className="flex flex-col flex-grow">
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
