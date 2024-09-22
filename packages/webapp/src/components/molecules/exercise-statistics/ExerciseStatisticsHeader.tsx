import { ExerciseHistory, ExerciseOverallStats } from "@gymex/commons/src";
import { Separator } from "../../ui/separator";

type Props = {
  data: {
    history: ExerciseHistory;
    overallStats: ExerciseOverallStats;
  };
};

export const ExerciseStatisticsHeader = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center">
        <span className="text-3xl text-white font-display">
          {data.overallStats.exerciseName.toUpperCase()}
        </span>
      </div>
      <Separator />
      <div className="flex flex-col">
        <div className="flex items-center justify-center mb-4 text-tertiary-light">
          SUMMARY
        </div>
        {Object.entries(data.overallStats).map(([statisticName, value]) => (
          <div className="flex flex-col mb-2">
            <div
              key={statisticName}
              className="flex items-center justify-between"
            >
              <span className="font-display text-">{statisticName}</span>
              <span className="text-tertiary-default">{value}</span>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
};
