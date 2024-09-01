import { Button } from "../../ui/button";
import { useMediaQuery } from "usehooks-ts";
import { useTimer } from "../../../hooks/utils/useTimer";
import { AddExerciseToWorkout } from "@gymex/commons/src";
import { StopwatchCountdown } from "../../../hooks/utils/StopwatchCountdown";

type Props = {
  activeExercise: AddExerciseToWorkout;
};

export const ActiveWorkoutHeader = ({ activeExercise }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { formattedTime } = useTimer();
  return (
    <div className="flex items-center gap-6">
      <Button className={`${isDesktop ? "min-h-14" : ""}`}>
        {isDesktop ? "Finish workout" : "Finish"}
      </Button>
      <div className="flex flex-col items-center">
        {isDesktop ? (
          <span className={`text-3xl font-display`}>Duration time</span>
        ) : (
          <span className={`text-m font-display`}>Duration</span>
        )}

        <span
          className={`text-${isDesktop ? "xl" : "l"} text-textInput-default`}
        >
          {formattedTime}
        </span>
      </div>
      <div className="flex items-center ml-auto">
        <StopwatchCountdown restTimeValue={Number(activeExercise.restTime)} />
      </div>
    </div>
  );
};
