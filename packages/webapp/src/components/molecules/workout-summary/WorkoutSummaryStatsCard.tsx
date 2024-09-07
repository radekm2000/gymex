import { DetailedWorkoutModel, WorkoutSummary } from "@gymex/commons/src";
import { Card, CardHeader } from "../../ui/card";
import { WorkoutSummaryStatItem } from "../../atoms/icons/WorkoutSummaryStatItem";
import { DumbbellIcon, RotateCw, Timer, Weight } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { formatSecondsToDuration } from "../../../hooks/utils/formatSecondsToDuration";
import { formatSessionTimeStamps } from "../../../hooks/utils/formatSessionTimestamps";
import { List } from "lucide-react";

type Props = {
  summary: WorkoutSummary;
  trainingPlan: DetailedWorkoutModel;
};

export const WorkoutSummaryStatsCard = ({ summary, trainingPlan }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const formattedDuration = formatSecondsToDuration(
    summary.totalTrainingTimeInSeconds
  );

  const formattedTimestamps = formatSessionTimeStamps(trainingPlan);
  return (
    <Card className="flex flex-col bg-opacity-100 bg-textInput-exercisebg">
      <CardHeader className="flex flex-col p-0 text-neutral-950 font-display ">
        <span className="lg:text-3xl text-neutral-950 font-display">
          {trainingPlan.workout.name}
        </span>
        <div className="flex">
          <span className="text-textInput-default">
            {formattedTimestamps.formattedDate}
          </span>
          &nbsp; &nbsp;
          <span className="text-textInput-default">
            {formattedTimestamps.timeDuration}
          </span>
        </div>
      </CardHeader>
      <div className="grid grid-cols-2 gap-4 py-4">
        <WorkoutSummaryStatItem
          icon={<Timer size={isDesktop ? 42 : 36} />}
          data={formattedDuration}
          title={isDesktop ? "TIME DURATION" : "DURATION"}
        />
        <WorkoutSummaryStatItem
          icon={<DumbbellIcon size={isDesktop ? 42 : 36} />}
          data={summary.totalExercises}
          title="EXERCISES"
        />
        <WorkoutSummaryStatItem
          icon={<List size={isDesktop ? 42 : 36} />}
          data={summary.totalSets}
          title="SETS"
        />
        <WorkoutSummaryStatItem
          icon={<RotateCw size={isDesktop ? 42 : 36} />}
          data={summary.totalReps}
          title="REPS"
        />
        <WorkoutSummaryStatItem
          icon={<Weight size={isDesktop ? 42 : 36} />}
          data={summary.maxWeight}
          suffix="kg"
          title={isDesktop ? "MAX WEIGHT" : "WEIGHT"}
        />
        <WorkoutSummaryStatItem
          icon={<Weight size={isDesktop ? 42 : 36} />}
          data={summary.totalWeight}
          suffix="kg"
          title={isDesktop ? "TOTAL WEIGHT" : "TOTAL"}
        />
      </div>
    </Card>
  );
};
