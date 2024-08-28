import { DumbbellIcon, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { DeleteButton } from "../../atoms/inputs/DeleteButton";

type Props = {
  exerciseName: string;
  primaryMuscleTargeted: string;
  exerciseId: number;
  restTime: string;
  onDelete: (exerciseId: number) => void;
};

export const CreateTrainingExerciseHeader = ({
  exerciseName,
  exerciseId,
  primaryMuscleTargeted,
  restTime,
  onDelete,
}: Props) => {
  return (
    <div className="flex items-center justify-start gap-6">
      <div>
        <DumbbellIcon className=" text-secondary-veryLight size-6 md:size-10" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl md:text-2xl font-display text-neutral-950">
          {exerciseName}
        </span>
        <div className="flex">
          <span className="text-sm text-textInput-default md:text-lg">
            Muscle targeted:
          </span>
          &nbsp;
          <span className="text-sm text-neutral-950 md:text-lg">
            {primaryMuscleTargeted}
          </span>
        </div>
        <div className="flex">
          <span className="text-sm text-textInput-default md:text-lg">
            Rest time:
          </span>
          &nbsp;
          <span className="text-sm text-neutral-950 md:text-lg">
            {restTime}
          </span>
        </div>
      </div>
      <div className="ml-auto ">
        <DeleteButton
          idToDelete={exerciseId}
          iconSize="6"
          iconMdSize="10"
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};
