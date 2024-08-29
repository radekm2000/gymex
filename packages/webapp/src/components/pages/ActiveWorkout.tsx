import { useHistoryState } from "wouter/use-browser-location";
import { Card } from "../ui/card";
import { ActiveWorkoutHeader } from "../molecules/active-workout/ActiveWorkoutHeader";
import { DetailedWorkoutModel } from "@gymex/commons/src";
import { useEffect } from "react";
import { ActiveWorkoutContent } from "../molecules/active-workout/ActiveWorkoutContent";
import { Separator } from "../ui/separator";
import { ActiveWorkoutFooter } from "../molecules/active-workout/ActiveWorkoutFooter";
import { useWorkoutStore } from "../../hooks/utils/useWorkoutStore";

export const ActiveWorkout = () => {
  const state = useHistoryState();
  const workoutModel: DetailedWorkoutModel = state?.workoutModel;
  const {
    activeWorkoutModel,
    setTrainingPlan2,
    mapDetailedWorkoutModelToWorkoutFinishSchema,
  } = useWorkoutStore();

  useEffect(() => {
    if (workoutModel) {
      setTrainingPlan2(workoutModel);
      mapDetailedWorkoutModelToWorkoutFinishSchema(workoutModel);
    }
  }, [
    mapDetailedWorkoutModelToWorkoutFinishSchema,
    setTrainingPlan2,
    workoutModel,
  ]);

  //   const [trainingPlan, setTrainingPlan] = useState(workoutModel);
  return (
    activeWorkoutModel && (
      <Card className="flex flex-col gap-20">
        <div className="flex flex-col gap-2">
          <ActiveWorkoutHeader />
          <Separator />
        </div>
        <ActiveWorkoutContent />
        <ActiveWorkoutFooter />
      </Card>
    )
  );
};
