import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { WorkoutSummaryHeader } from "../molecules/workout-summary/WorkoutSummaryHeader";
import { WorkoutSummaryStatsCard } from "../molecules/workout-summary/WorkoutSummaryStatsCard";
import { WorkoutSummaryChartPie } from "../molecules/workout-summary/WorkoutSummaryChartPie";
import { useHistoryState } from "wouter/use-browser-location";
import {
  DetailedWorkoutModel,
  WorkoutSummary as TWorkoutSummary,
} from "@gymex/commons/src";
import html2canvas from "html2canvas";
import { WorkoutSummaryDownloadable } from "../molecules/workout-summary/WorkoutSummaryDownloadable";

export const WorkoutSummary = () => {
  const state = useHistoryState();
  const summary: TWorkoutSummary = state?.summary;
  const trainingPlan: DetailedWorkoutModel = state?.trainingPlan;

  const handleSummaryDownload = async () => {
    const element = document.getElementById("print");
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    link.href = data;

    const dateNow = new Date().getTime();

    link.download = `${dateNow}-workout-summary`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    summary &&
    trainingPlan && (
      <>
        <Card id="no-print" className="flex flex-col gap-4 p-0 pb-4">
          <WorkoutSummaryHeader handleSummaryDownload={handleSummaryDownload} />
          <Separator className="w-full" />
          <div className="px-2 lg:px-4">
            <WorkoutSummaryStatsCard
              summary={summary}
              trainingPlan={trainingPlan}
            />
          </div>
          <div className="flex items-center justify-center ">
            <span className="text-sm text-white text-wrap font display lg:text-3xl">
              TOTAL SETS PER MUSCLE GROUP
            </span>
          </div>
          <div className="w-11/12 h-[500px]  mx-auto -mt-12 sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 ">
            <WorkoutSummaryChartPie muscleStats={summary.muscleStats} />
          </div>
        </Card>
      </>
    )
  );
};
