import { useHistoryState } from "wouter/use-browser-location";
import { Card } from "../ui/card";
import { ActiveWorkoutHeader } from "../molecules/active-workout/ActiveWorkoutHeader";
import { DetailedWorkoutModel } from "@gymex/commons/src";
import { useEffect, useState } from "react";
import { ActiveWorkoutContent } from "../molecules/active-workout/ActiveWorkoutContent";
import { Separator } from "../ui/separator";
import { ActiveWorkoutFooter } from "../molecules/active-workout/ActiveWorkoutFooter";
import { useWorkoutStore } from "../../hooks/utils/useWorkoutStore";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

export const ActiveWorkout = () => {
  const state = useHistoryState();
  const workoutModel: DetailedWorkoutModel = state?.workoutModel;
  const setWorkoutModelUpdatedToTrue = state?.setWorkoutModelUpdatedToTrue;

  const [isWorkoutModelUpdated, setIsWorkoutModelUpdated] = useState(false);
  const { activeWorkoutModel, mapDetailedWorkoutModelToWorkoutFinishSchema } =
    useWorkoutStore();
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  useEffect(() => {
    if (workoutModel) {
      mapDetailedWorkoutModelToWorkoutFinishSchema(workoutModel);
      setIsWorkoutModelUpdated(true);
    }

    return () => setIsWorkoutModelUpdated(false);
  }, [mapDetailedWorkoutModelToWorkoutFinishSchema, workoutModel]);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (setWorkoutModelUpdatedToTrue) {
      setIsWorkoutModelUpdated(true);
    }
    return () => setIsWorkoutModelUpdated(false);
  }, [setWorkoutModelUpdatedToTrue]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setActiveExerciseIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setActiveExerciseIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const activeExercise = activeWorkoutModel.exercises[activeExerciseIndex];

  return (
    isWorkoutModelUpdated &&
    activeExercise && (
      <Card className="flex flex-col gap-20">
        <div className="flex flex-col gap-2">
          <ActiveWorkoutHeader activeExercise={activeExercise} />
          <Separator />
        </div>
        <Carousel
          className="w-full mx-auto max-w-64 max-w-s md:max-w-xl xl:max-w-3xl lg:max-w-2xl"
          setApi={setApi}
        >
          <CarouselContent className="">
            {activeWorkoutModel.exercises.map((e) => (
              <CarouselItem>
                <ActiveWorkoutContent
                  key={e.id}
                  activeExercise={e}
                  setActiveExerciseIndex={setActiveExerciseIndex}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <ActiveWorkoutFooter activeExercise={activeExercise} />
      </Card>
    )
  );
};
