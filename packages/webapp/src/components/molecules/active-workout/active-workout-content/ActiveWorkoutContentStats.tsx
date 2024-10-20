import { AddExerciseToWorkout } from "@gymex/commons/src";
import { useWorkoutStore } from "../../../../hooks/utils/useWorkoutStore";
import { Input } from "../../../ui/input";
import { Separator } from "../../../ui/separator";
import { Checkbox } from "../../../ui/checkbox";
import { useSettingsStore } from "../../../../hooks/utils/useSettingsStore";

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
          <Input
            type="number"
            value={set.weight}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) {
                e.preventDefault();
              }

              if (
                ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(
                  e.key
                )
              ) {
                return;
              }

              if (
                isNaN(Number(e.key)) ||
                e.key === " " ||
                e.key === "189" ||
                e.key === "69"
              ) {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              if (e.target.value === "0" && e.target.value.length >= 0) {
                e.preventDefault();
                return;
              }
              updateWeight(
                activeExercise.id,
                set.exerciseSetNumber,
                e.target.value
              );
            }}
            className={`${Number(set.weight) < 100 ? "w-6" : "w-8"} !p-0 text-center border-0 focus-visible:ring-[none]  [&::-webkit-inner-spin-button]:appearance-none bg-transparent `}
          />
          <span className="text-xs">kg</span>
        </div>
        <div className="flex items-center">
          <Input
            type="number"
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) {
                e.preventDefault();
              }

              if (
                ["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(
                  e.key
                )
              ) {
                return;
              }

              if (
                isNaN(Number(e.key)) ||
                e.key === " " ||
                e.key === "189" ||
                e.key === "69"
              ) {
                e.preventDefault();
              }
            }}
            value={set.reps}
            onChange={(e) => {
              if (e.target.value === "0" && e.target.value.length >= 0) {
                e.preventDefault();
                return;
              }
              updateReps(
                activeExercise.id,
                set.exerciseSetNumber,
                e.target.value
              );
            }}
            className="ml-auto w-12 !p-0 text-center border-0  focus-visible:ring-[none]  [&::-webkit-inner-spin-button]:appearance-none bg-transparent"
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
