import { DetailedWorkoutModel } from "@gymex/commons/src";
import { Card, CardHeader } from "../../ui/card";
import { WorkoutSummaryStatItem } from "../../atoms/icons/WorkoutSummaryStatItem";
import { DumbbellIcon, RotateCw, Timer, Weight } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  trainingPlan?: DetailedWorkoutModel;
};

export const WorkoutSummaryStatsCard = ({ trainingPlan }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Card className="flex flex-col bg-opacity-100 bg-textInput-exercisebg">
      <CardHeader className="flex flex-col p-0 text-neutral-950 font-display ">
        <span className="lg:text-3xl text-neutral-950 font-display">
          Plan22
        </span>
        <div className="flex">
          <span className="text-textInput-default">10.08.2024</span>
          &nbsp;
          <span className="text-textInput-default">08:54 - 10:08</span>
        </div>
      </CardHeader>
      <div className="grid grid-cols-2 gap-4 py-4">
        <WorkoutSummaryStatItem
          icon={<Timer size={isDesktop ? 42 : 36} />}
          data={"01:13:16"}
          title={isDesktop ? "TIME DURATION" : "DURATION"}
        />
        <WorkoutSummaryStatItem
          icon={<DumbbellIcon size={isDesktop ? 42 : 36} />}
          data={"2"}
          title="EXERCISES"
        />
        <WorkoutSummaryStatItem
          icon={<Timer size={isDesktop ? 42 : 36} />}
          data={"7"}
          title="SETS"
        />
        <WorkoutSummaryStatItem
          icon={<RotateCw size={isDesktop ? 42 : 36} />}
          data={"28"}
          title="REPS"
        />
        <WorkoutSummaryStatItem
          icon={<Weight size={isDesktop ? 42 : 36} />}
          data={"40"}
          suffix="kg"
          title={isDesktop ? "MAX WEIGHT" : "WEIGHT"}
        />
        <WorkoutSummaryStatItem
          icon={<Weight size={isDesktop ? 42 : 36} />}
          data={"980"}
          suffix="kg"
          title={isDesktop ? "TOTAL WEIGHT" : "TOTAL"}
        />
      </div>
    </Card>
  );
};
