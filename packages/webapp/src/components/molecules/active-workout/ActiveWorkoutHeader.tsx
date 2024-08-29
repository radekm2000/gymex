import { Button } from "../../ui/button";
import { StopwatchIcon } from "../../atoms/icons/StopwatchIcon";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useTimer } from "../../../hooks/utils/useTimer";
import { useWorkoutStore } from "../../../hooks/utils/useWorkoutStore";

export const ActiveWorkoutHeader = () => {
  const [clicked, setIsClicked] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { formattedTime } = useTimer();
  const { activeWorkoutModel: trainingPlan } = useWorkoutStore();

  const onClicked = () => {
    setIsClicked(!clicked);
  };
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
      <div className="ml-auto" onClick={onClicked}>
        <StopwatchIcon clicked={clicked} />
      </div>
    </div>
  );
};
