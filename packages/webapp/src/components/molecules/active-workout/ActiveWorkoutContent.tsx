import { useQuery } from "@tanstack/react-query";
import { useWorkoutStore } from "../../../hooks/utils/useWorkoutStore";
import { Card } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { CreateTrainingExerciseHeader } from "../training-plans/CreateTrainingExerciseHeader";
import { CreateTrainingExerciseSetsList } from "../training-plans/CreateTrainingExerciseSetsList";
import {
  ExercisesQueryKeys,
  getExerciseModel,
} from "../../../api/requests/exercises";
import { LoadingProgress } from "../utils/LoadingProgress";
import { AddExerciseToWorkout } from "@gymex/commons/src";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../../ui/carousel";
import { useEffect, useState } from "react";

type Props = {
  activeExercise: AddExerciseToWorkout;
  setActiveExerciseIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const ActiveWorkoutContent = ({
  activeExercise,
  setActiveExerciseIndex,
}: Props) => {
  const {
    activeWorkoutModel: trainingPlan,
    addSet,
    deleteSet,
    updateReps,
    updateWeight,
    deleteExercise
  } = useWorkoutStore();

  const firstExercise = trainingPlan.exercises[0];

  const { data: exercise, isLoading } = useQuery({
    queryKey: ExercisesQueryKeys.detail(firstExercise?.id),
    queryFn: () => getExerciseModel(firstExercise.id),
    enabled: !!firstExercise,
  });

  if (isLoading) {
    return <LoadingProgress />;  }
  // return (
  //   trainingPlan.exercises && (
  //     <div className="w-full mx-auto max-w-64 max-w-s md:max-w-xl xl:max-w-3xl lg:max-w-2xl">
  //       <Carousel setApi={setApi} className="">
  //         <CarouselContent>
  //           {trainingPlan.exercises.map((e) => (
  //             <CarouselItem key={e.id}>
  //               <Card className="flex flex-col gap-2 p-3 sm:p-4 bg-textInput-light">
  //                 <CreateTrainingExerciseHeader
  //                   exerciseId={e.id}
  //                   exerciseName={e.exerciseName}
  //                   onDelete={() => {}}
  //                   primaryMuscleTargeted={"chest"}
  //                   restTime={e?.restTime}
  //                 />
  //                 <div>
  //                   <Separator />
  //                 </div>

  //                 <CreateTrainingExerciseSetsList
  //                   exerciseFromWorkout={firstExercise}
  //                   exerciseId={firstExercise.id}
  //                   onSetAdd={addSet}
  //                   onSetDelete={deleteSet}
  //                   updateReps={updateReps}
  //                   updateWeight={updateWeight}
  //                 />
  //               </Card>
  //             </CarouselItem>
  //           ))}
  //         </CarouselContent>
  //         <CarouselPrevious className="hidden md:block" />
  //         <CarouselNext className="hidden md:block" />
  //       </Carousel>
  //     </div>
  //   )
  // );
  return (
    <Card className="flex flex-col gap-2 p-3 sm:p-4 bg-textInput-light">
      <CreateTrainingExerciseHeader
        exerciseId={activeExercise.id}
        exerciseName={activeExercise.exerciseName}
        onDelete={deleteExercise}
        primaryMuscleTargeted={"chest"}
        restTime={activeExercise?.restTime}
      />
      <div>
        <Separator />
      </div>

      <CreateTrainingExerciseSetsList
        exerciseFromWorkout={activeExercise}
        exerciseId={activeExercise.id}
        onSetAdd={addSet}
        onSetDelete={deleteSet}
        updateReps={updateReps}
        updateWeight={updateWeight}
      />
    </Card>
  );
};
