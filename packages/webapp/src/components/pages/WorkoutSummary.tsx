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
import { RefObject, useEffect, useRef, useState } from "react";

export const WorkoutSummary = () => {
  const state = useHistoryState();
  const summary: TWorkoutSummary = state?.summary;
  const trainingPlan: DetailedWorkoutModel = state?.trainingPlan;
  const shareTarget = useRef(null);

  const [isPrintable, setIsPrintable] = useState(false);
  const [isShareable, setIsShareable] = useState(false);

  const download = async () => {
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
  const handleSummaryDownload = async () => {
    setIsPrintable(true);
    download();
  };
  useEffect(() => {
    if (isPrintable) {
      download();
      setIsPrintable(false);
    }
  }, [isPrintable]);

  const handleShare = async () => {
    setIsShareable(true);
    shareCanvas(shareTarget);
  };

  useEffect(() => {
    if (isShareable) {
      shareCanvas(shareTarget);
      setIsShareable(false);
    }
  }, [isShareable]);
  const shareCanvas = async (shareTarget: RefObject<HTMLDivElement>) => {
    if (!shareTarget.current) return;
    const canvas = await html2canvas(shareTarget.current);
    const dataUrl = canvas.toDataURL();
    const blob = await (await fetch(dataUrl)).blob();
    const filesArray = [
      new File([blob], "animation.png", {
        type: blob.type,
        lastModified: new Date().getTime(),
      }),
    ];
    const shareData = {
      files: filesArray,
    };
    navigator.share(shareData);
  };

  return (
    summary &&
    trainingPlan && (
      <>
        <Card id="" className="flex flex-col gap-4 p-0 pb-4 print-hidden">
          <WorkoutSummaryHeader
            shareCanvas={shareCanvas}
            shareTarget={shareTarget}
            handleShare={handleShare}
            handleSummaryDownload={handleSummaryDownload}
          />
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

        {(isShareable || isPrintable) && (
          <div id="print" ref={shareTarget} className="pb-0 print-visible ">
            <WorkoutSummaryDownloadable
              summary={summary}
              trainingPlan={trainingPlan}
            />
          </div>
        )}
      </>
    )
  );
};
