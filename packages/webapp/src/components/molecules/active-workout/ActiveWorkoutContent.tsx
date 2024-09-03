import { useWorkoutStore } from "../../../hooks/utils/useWorkoutStore";
import { Card } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { CreateTrainingExerciseHeader } from "../training-plans/CreateTrainingExerciseHeader";
import { CreateTrainingExerciseSetsList } from "../training-plans/CreateTrainingExerciseSetsList";
import { AddExerciseToWorkout } from "@gymex/commons/src";
import { ActiveWorkoutContentHeader } from "./active-workout-content/ActiveWorkoutContentHeader";
import { ActiveWorkoutContentStats } from "./active-workout-content/ActiveWorkoutContentStats";

type Props = {
  activeExercise: AddExerciseToWorkout;
};

export const ActiveWorkoutContent = ({ activeExercise }: Props) => {
  const { addSet, deleteSet, updateReps, updateWeight, deleteExercise } =
    useWorkoutStore();
  // return (
  //   <Card className="flex flex-col gap-2 p-3 sm:p-4 bg-textInput-light">
  //     <CreateTrainingExerciseHeader
  //       exerciseId={activeExercise.id}
  //       exerciseName={activeExercise.exerciseName}
  //       onDelete={deleteExercise}
  //       primaryMuscleTargeted={"chest"}
  //       restTime={activeExercise?.restTime}
  //     />
  //     <div>
  //       <Separator />
  //     </div>

  //     <CreateTrainingExerciseSetsList
  //       exerciseFromWorkout={activeExercise}
  //       exerciseId={activeExercise.id}
  //       onSetAdd={addSet}
  //       onSetDelete={deleteSet}
  //       updateReps={updateReps}
  //       updateWeight={updateWeight}
  //     />
  //   </Card>
  // );

  return (
    <div className="">
      <ActiveWorkoutContentHeader activeExercise={activeExercise} />
      <ActiveWorkoutContentStats activeExercise={activeExercise} />
    </div>
  );
};
