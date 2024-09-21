import { WorkoutHistory } from "@gymex/commons/src";
import { formatSessionTimeStamps } from "../../../hooks/utils/formatSessionTimestamps";
import { Clock, DumbbellIcon } from "lucide-react";
import { formatSecondsToDuration } from "../../../hooks/utils/formatSecondsToDuration";
import { useMediaQuery } from "usehooks-ts";
import { useLocation } from "wouter";

type Props = {
  workout: WorkoutHistory;
};

export const WorkoutSessionItem = ({ workout }: Props) => {
  const [, setLocation] = useLocation();

  const durationTimeInSeconds =
    workout.workoutSummary.totalTrainingTimeInSeconds;
  const { formattedDate, timeDuration } = formatSessionTimeStamps(
    workout.detailedWorkoutModel
  );

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const onClick = () => {
    setLocation(`/workout/${workout.detailedWorkoutModel.workout.id}/summary`, {
      state: {
        summary: workout.workoutSummary,
        trainingPlan: workout.detailedWorkoutModel,
      },
    });
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center px-2 cursor-pointer text-textInput-darker "
    >
      <DumbbellIcon size={isDesktop ? 32 : 20} />
      <div className="flex flex-col ml-4">
        <span className={`${isDesktop ? "text-2xl" : "text-md"} font-display`}>
          {workout.detailedWorkoutModel.workout.name.toUpperCase()}
        </span>
        <div className={`${isDesktop ? "flex" : "flex flex-col"}`}>
          <span
            className={`${isDesktop ? "text-md" : "text-sm"} text-textInput-default`}
          >
            {formattedDate} &nbsp;
          </span>
          <span
            className={`${isDesktop ? "text-md" : "text-sm"} text-textInput-default`}
          >
            {timeDuration}
          </span>
        </div>
      </div>
      <div className="items-center ml-auto">
        <div className="flex items-center ml-auto">
          <Clock size={isDesktop ? 26 : 20} />
          &nbsp;
          <span>{formatSecondsToDuration(durationTimeInSeconds)}</span>
        </div>
      </div>
    </div>
  );
};
