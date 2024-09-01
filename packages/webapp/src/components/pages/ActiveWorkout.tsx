import { useHistoryState } from "wouter/use-browser-location";
import { Card } from "../ui/card";
import { ActiveWorkoutHeader } from "../molecules/active-workout/ActiveWorkoutHeader";
import { DetailedWorkoutModel } from "@gymex/commons/src";
import { act, useEffect, useState } from "react";
import { ActiveWorkoutContent } from "../molecules/active-workout/ActiveWorkoutContent";
import { Separator } from "../ui/separator";
import { ActiveWorkoutFooter } from "../molecules/active-workout/ActiveWorkoutFooter";
import { useWorkoutStore } from "../../hooks/utils/useWorkoutStore";

export const ActiveWorkout = () => {
  const state = useHistoryState();
  const workoutModel: DetailedWorkoutModel = state?.workoutModel;
  const [isWorkoutModelUpdated, setIsWorkoutModelUpdated] = useState(false);
  const { activeWorkoutModel, mapDetailedWorkoutModelToWorkoutFinishSchema } =
    useWorkoutStore();

  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  console.log(activeExerciseIndex);
  useEffect(() => {
    if (workoutModel) {
      mapDetailedWorkoutModelToWorkoutFinishSchema(workoutModel);
      setIsWorkoutModelUpdated(true);
    }

    return () => setIsWorkoutModelUpdated(false);
  }, [mapDetailedWorkoutModelToWorkoutFinishSchema, workoutModel]);
  console.log("aktywny exercajs index");
  console.log(activeExerciseIndex);
  const activeExercise = activeWorkoutModel.exercises[activeExerciseIndex];
  console.log("aktynwy exercajs nejm");
  console.log(activeExercise.exerciseName);
  return (
    isWorkoutModelUpdated &&
    activeExercise && (
      <Card className="flex flex-col gap-20">
        <div className="flex flex-col gap-2">
          <ActiveWorkoutHeader activeExercise={activeExercise} />
          <Separator />
        </div>
        <ActiveWorkoutContent
          activeExercise={activeExercise}
          setActiveExerciseIndex={setActiveExerciseIndex}
        />
        <ActiveWorkoutFooter activeExercise={activeExercise} />
      </Card>
    )
  );
};
