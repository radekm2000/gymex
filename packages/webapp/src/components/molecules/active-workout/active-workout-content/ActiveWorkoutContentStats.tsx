import { AddExerciseToWorkout } from "@gymex/commons/src";
import { useWorkoutStore } from "../../../../hooks/utils/useWorkoutStore";
import { Input } from "../../../ui/input";
import { Separator } from "../../../ui/separator";

type Props = {
  activeExercise: AddExerciseToWorkout;
};

export const ActiveWorkoutContentStats = ({ activeExercise }: Props) => {
  const { updateReps, updateWeight } = useWorkoutStore();

  return activeExercise.sets.map((set, index) => (
    <div key={index} className="flex flex-col items-center">
      {index === 0 && (
        <div className="flex justify-between w-full">
          <span className="text-sm text-textInput-light md:text-lg">SETS</span>
          <span className="text-sm text-textInput-light md:text-lg">
            WEIGHT
          </span>
          <span className="text-sm text-textInput-light md:text-lg">REPS</span>
        </div>
      )}
      <Separator />
      <div className="flex items-center justify-between w-full">
        <span className="text-center cursor-default ">{set.exerciseSetNumber}</span>
        <Input
          value={set.weight}
          onChange={(e) =>
            updateWeight(
              activeExercise.id,
              set.exerciseSetNumber,
              e.target.value
            )
          }
          className="w-12 !p-0 text-center border-0 focus-visible:ring-[none] text-textInput-light "
        />
        <Input
          value={set.reps}
          onChange={(e) =>
            updateReps(activeExercise.id, set.exerciseSetNumber, e.target.value)
          }
          className="w-12 !p-0 text-center border-0  focus-visible:ring-[none] text-textInput-light "
        />
      </div>
    </div>
  ));
};
