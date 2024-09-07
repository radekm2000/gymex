import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { RoutePath } from "../../../constants/navigation";

export const WorkoutSummaryHeader = () => {
  const [, setLocation] = useLocation();
  return (
    <div className="px-2">
      <div className="flex flex-col w-full pt-4 ">
        <div className="flex items-center w-full gap-4 text-white">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => setLocation(RoutePath.TrainingPlans)}
          />
          <span className="text-xl lg:text-3xl">Training raport</span>
        </div>
      </div>
    </div>
  );
};
