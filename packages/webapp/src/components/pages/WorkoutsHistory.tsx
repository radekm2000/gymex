import { Timer } from "lucide-react";
import { WorkoutSummaryStatIcon } from "../atoms/icons/WorkoutSummaryStatIcon";

export const WorkoutsHistory = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-textInput-light h-[400px] bg-opacity-90">
      <span className="text-2xl text-white">siertemreoraeorao</span>
      <WorkoutSummaryStatIcon
        icon={<Timer size={42} />}
        data={"01:13:16"}
        title="TIME DURATION"
      />
    </div>
  );
};
