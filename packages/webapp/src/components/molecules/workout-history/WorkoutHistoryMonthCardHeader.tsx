import { MonthYear, WorkoutHistory } from "@gymex/commons/src";
import { Card } from "../../ui/card";
import { CustomIconWithData } from "../../atoms/icons/CustomIconWithData";
import { Clock, DumbbellIcon, Weight } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { formatMonthYear } from "../../../hooks/utils/formatMonthYear";
import { formatSecondsToDuration } from "../../../hooks/utils/formatSecondsToDuration";
import { formatTotalWeighToUi } from "../../../hooks/utils/formatTotalWeighToUi";

type Props = {
  isExpanded: boolean;
  workouts: WorkoutHistory[];
  monthYear: MonthYear;
};

export const WorkoutHistoryMonthCardHeader = ({
  isExpanded,
  workouts,
  monthYear,
}: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const totalWorkoutDurationTimeInSecondsDuringEntireMonth = workouts.reduce(
    (acc, workout) => acc + workout.workoutSummary.totalTrainingTimeInSeconds,
    0
  );

  const totalWeight = workouts.reduce(
    (acc, workout) => acc + workout.workoutSummary.totalWeight,
    0
  );

  return (
    <Card
      className={` w-full  bg-opacity-50 border-none cursor-pointer hover:bg-opacity-70 bg-primary-dark px-2 ${
        isExpanded ? "rounded-b-none" : "rounded-lg"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="border rounded-full ">
          <span
            className={`flex items-center justify-center  text-2xl ${isDesktop ? "size-14" : "size-10"}`}
          >
            {workouts.length}
          </span>
        </div>
        <div className="flex flex-col w-full gap-1 ml-2">
          <span
            className={`flex justify-start ${isDesktop ? "text-2xl" : "text-base"}`}
          >
            {formatMonthYear(monthYear)}
          </span>
          <div className="flex justify-between">
            <CustomIconWithData
              icon={<Clock size={isDesktop ? 20 : 15} />}
              data={formatSecondsToDuration(
                totalWorkoutDurationTimeInSecondsDuringEntireMonth
              )}
            />
            <CustomIconWithData
              icon={<DumbbellIcon size={isDesktop ? 20 : 15} />}
              data="5"
            />
            <CustomIconWithData
              icon={<Weight size={isDesktop ? 20 : 15} />}
              data={formatTotalWeighToUi(totalWeight)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
