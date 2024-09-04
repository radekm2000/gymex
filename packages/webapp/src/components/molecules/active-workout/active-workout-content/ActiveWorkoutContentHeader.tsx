import { AddExerciseToWorkout } from "@gymex/commons/src";
import { DumbbellIcon } from "lucide-react";
import { DeleteButton } from "../../../atoms/inputs/DeleteButton";
import { useWorkoutStore } from "../../../../hooks/utils/useWorkoutStore";

type Props = {
  activeExercise: AddExerciseToWorkout;
};

export const ActiveWorkoutContentHeader = ({ activeExercise }: Props) => {
  const { deleteExercise } = useWorkoutStore();
  return (
    <div className="flex items-center gap-6">
      <div className="self-center -mt-4">
        <DumbbellIcon className=" text-secondary-veryLight size-6 md:size-12" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl md:text-3xl font-display text-textInput-exercisebg">
          {activeExercise.exerciseName}
        </span>

        <div className="flex flex-col">
          <span className="text-sm text-textInput-default md:text-lg">
            Primary muscle
          </span>
          <span className="text-sm text-textInput-exercisebg md:text-lg">
            {activeExercise.primaryMuscleTargeted}
          </span>
        </div>
      </div>
      <div className="ml-auto -mt-4 -mr-4">
        <DeleteButton
          idToDelete={activeExercise.id}
          iconSize="6"
          iconMdSize="12"
          onDelete={deleteExercise}
        />
      </div>
    </div>
  );
};
