import { AddExerciseToWorkout } from "@gymex/commons/src";
import { useWorkoutStore } from "../../../../hooks/utils/useWorkoutStore";
import { Separator } from "../../../ui/separator";
import { Checkbox } from "../../../ui/checkbox";
import { useSettingsStore } from "../../../../hooks/utils/useSettingsStore";
import { InsertWorkoutStatsInput } from "../../../atoms/inputs/InsertWorkoutStatsInput";

type Props = {
  activeExercise: AddExerciseToWorkout;
};

export const ActiveWorkoutContentStats = ({ activeExercise }: Props) => {
  const { updateReps, updateWeight, toggleSetIsFinished } = useWorkoutStore();
  const { showCheckboxesInSets } = useSettingsStore();

  return activeExercise.sets.map((set, index) => (
    <div key={index} className={`flex flex-col items-center`}>
      {index === 0 && (
        <div className={`flex justify-between w-full   `}>
          <span className="text-sm text-textInput-light md:text-lg">SETS</span>
          <span className="mr-6 text-sm text-textInput-light md:text-lg">
            WEIGHT
          </span>
          <span className="text-sm text-textInput-light md:text-lg">REPS</span>
        </div>
      )}
      <Separator />
      <div
        className={` text-white flex items-center justify-between px-2  w-full  ${set.isFinished ? "bg-primaryButton-create bg-opacity-50 rounded-sm" : ""} `}
      >
        <span className="text-lg text-center text-white cursor-default font-display ">
          {set.exerciseSetNumber}
        </span>
        <div className="flex items-center">
          <InsertWorkoutStatsInput
            className={`${Number(set.weight) < 100 ? "w-6" : "w-8"} !p-0 text-center border-0 focus-visible:ring-[none]  [&::-webkit-inner-spin-button]:appearance-none bg-transparent `}
            value={set.weight}
            onChange={(e) => {
              updateWeight(
                activeExercise.id,
                set.exerciseSetNumber,
                e.target.value
              );
            }}
          />
          <span className="text-xs">kg</span>
        </div>
        <div className="flex items-center">
          <InsertWorkoutStatsInput
            value={set.reps}
            className="ml-auto w-12 !p-0 text-center border-0  focus-visible:ring-[none]  [&::-webkit-inner-spin-button]:appearance-none bg-transparent"
            onChange={(e) => {
              updateReps(
                activeExercise.id,
                set.exerciseSetNumber,
                e.target.value
              );
            }}
          />

          {showCheckboxesInSets && (
            <Checkbox
              checked={set.isFinished}
              onClick={() =>
                toggleSetIsFinished(activeExercise.id, set.exerciseSetNumber)
              }
            />
          )}
        </div>
      </div>
    </div>
  ));
};
