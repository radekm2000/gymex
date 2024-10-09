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
  CarouselDots,
  CarouselItem,
} from "../ui/carousel";

export const ActiveWorkout = () => {
  const state = useHistoryState();
  const workoutModel: DetailedWorkoutModel = state?.workoutModel;
  const setWorkoutModelUpdatedToTrue = state?.setWorkoutModelUpdatedToTrue;
  const [isWorkoutModelUpdated, setIsWorkoutModelUpdated] = useState(false);
  const [api, setApi] = useState<CarouselApi>();

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

  useEffect(() => {
    if (activeWorkoutModel.exercises.length === 0) {
      setActiveExerciseIndex(0);
      return;
    }
    if (activeExerciseIndex >= activeWorkoutModel.exercises.length) {
      setActiveExerciseIndex(activeWorkoutModel.exercises.length - 1);
    }
  }, [activeExerciseIndex, activeWorkoutModel.exercises.length]);

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
      <Card className="relative flex flex-col h-full max-h-[600px] gap-4">
        <div className="flex flex-col gap-2">
          <ActiveWorkoutHeader activeExercise={activeExercise} />
          <Separator />
        </div>
        <Carousel
          className="w-[950px] h-3/4 mx-auto max-w-80 md:max-w-[36rem] lg:max-w-[40rem]  xl:max-w-[64rem] rounded-sm"
          setApi={setApi}
        >
          <CarouselContent className="">
            {activeWorkoutModel.exercises.map((e, index) => (
              <CarouselItem
                className="overflow-y-scroll overflow-x-hidden  max-h-[55vh] [&::-webkit-scrollbar]:w-[7px] [&::-webkit-scrollbar-thumb]:bg-primary-light"
                key={index}
              >
                <ActiveWorkoutContent key={e.id} activeExercise={e} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="absolute bottom-0 w-full mx-auto" />
        </Carousel>
        <div className="absolute w-full bottom-1">
          <ActiveWorkoutFooter activeExercise={activeExercise} />
        </div>
      </Card>
    )
  );
};
