import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { WorkoutSummaryHeader } from "../molecules/workout-summary/WorkoutSummaryHeader";
import { WorkoutSummaryStatsCard } from "../molecules/workout-summary/WorkoutSummaryStatsCard";
export const WorkoutSummary = () => {
  return (
    <Card className="flex flex-col gap-4 p-0 pb-4">
      <WorkoutSummaryHeader />
      <Separator className="w-full" />
      <div className="px-2 lg:px-4">
        <WorkoutSummaryStatsCard />
      </div>
    </Card>
  );
};
