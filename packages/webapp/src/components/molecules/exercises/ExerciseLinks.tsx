import { ExerciseModel } from "@gymex/commons/src";
import { DumbbellIcon, Trash2 } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { useExerciseDeleteMutation } from "../../../api/mutations/exercises";

type Props = {
  exercises: ExerciseModel[];
};

export const ExerciseLinks = ({ exercises }: Props) => {
  const deleteMutation = useExerciseDeleteMutation();

  const onDelete = (exerciseId: number) => {
    deleteMutation.mutate({ exerciseId });
  };

  return (
    <div className="flex flex-col gap-10 bg-primary-dark">
      <Card className="h-full -m-1">
        <div className="flex flex-col gap-4">
          {exercises.map((e, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex gap-8">
                <DumbbellIcon className=" text-secondary-veryLight" />
                <span className="text-lg font-display">{e.exerciseName}</span>
              </div>
              <button onClick={() => onDelete(e.id)}>
                <Trash2 className="text-primaryButton-delete" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
