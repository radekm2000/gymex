import { AddExerciseToWorkout } from "@gymex/commons/src";
import { ActiveWorkoutContentHeader } from "./active-workout-content/ActiveWorkoutContentHeader";
import { ActiveWorkoutContentStats } from "./active-workout-content/ActiveWorkoutContentStats";

type Props = {
  activeExercise: AddExerciseToWorkout;
};

export const ActiveWorkoutContent = ({ activeExercise }: Props) => {
  return (
    <div>
      <ActiveWorkoutContentHeader activeExercise={activeExercise} />
      <ActiveWorkoutContentStats activeExercise={activeExercise} />
    </div>
  );
};
