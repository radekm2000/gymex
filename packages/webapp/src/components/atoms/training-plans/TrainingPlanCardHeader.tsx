import { Card } from "../../ui/card";
import { DeleteButton } from "../inputs/DeleteButton";

type Props = {
  isExpanded: boolean;
  trainingPlanName: string;
  totalExercises: number;
  onDelete: (id: number) => void;
  onDeleteId: number;
};

export const TrainingPlanCardHeader = ({
  isExpanded,
  totalExercises,
  trainingPlanName,
  onDelete,
  onDeleteId,
}: Props) => {
  return (
    <Card
      className={`flex items-center justify-between w-full p-3 bg-opacity-50 border-b-0 cursor-pointer hover:bg-opacity-70 sm:p-4 bg-primary-dark ${
        isExpanded ? "rounded-b-none" : "rounded-lg"
      }`}
    >
      <div className="flex flex-col items-start gap-6">
        <span className="text-2xl md:text-3xl font-display ">
          {trainingPlanName}
        </span>
        <div className="flex">
          <span className="text-sm text-textInput-default md:text-lg">
            Total exercises:
          </span>
          &nbsp;
          <span className="text-sm md:text-lg">{totalExercises}</span>
        </div>
      </div>
        <DeleteButton
          className="px-0"
          onDelete={onDelete}
          iconSize="8"
          iconMdSize="9"
          idToDelete={onDeleteId}
        />
    </Card>
  );
};
