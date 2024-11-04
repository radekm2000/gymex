import { DetailedWorkoutModel, WorkoutSummary } from "@gymex/commons/src";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Logo } from "../../atoms/icons/Logo";
import { WorkoutSummaryStatsCard } from "./WorkoutSummaryStatsCard";
import { WorkoutSummaryStatsDescription } from "./WorkoutSummaryStatsDescription";

type Props = {
  summary: WorkoutSummary;
  trainingPlan: DetailedWorkoutModel;
};

export const WorkoutSummaryDownloadable = ({
  summary,
  trainingPlan,
}: Props) => {
  return (
    <Card className="flex flex-col gap-2 p-0 pb-4">
      <div className="self-center py-4 size-48">
        <Logo />
      </div>
      <CardContent className="-mt-10">
        <div className="px-2 lg:px-4">
          <WorkoutSummaryStatsCard
            summary={summary}
            trainingPlan={trainingPlan}
          />
        </div>
      </CardContent>
      <div className="px-2 lg:px-4">
        <WorkoutSummaryStatsDescription trainingPlan={trainingPlan} />
      </div>
    </Card>
  );
};
