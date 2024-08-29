import { AddExerciseToWorkout } from "@gymex/commons/src";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Trash2 } from "lucide-react";

type Props = {
  exerciseId: number;
  exerciseFromWorkout: AddExerciseToWorkout;
  updateWeight: (exerciseId: number, setId: string, newWeight: string) => void;
  updateReps: (exerciseId: number, setId: string, newReps: string) => void;
  onSetAdd: (exerciseId: number) => void;
  onSetDelete: (exerciseId: number, setId: string) => void;
};

export const CreateTrainingExerciseSetsList = ({
  exerciseId,
  exerciseFromWorkout,
  onSetDelete,
  onSetAdd,
  updateReps,
  updateWeight,
}: Props) => {

  return (
    <>
      {exerciseFromWorkout.sets.map((set, index) => (
        <>
          <div className="flex items-center justify-start">
            <div
              className={`flex flex-col ${exerciseFromWorkout.sets.length > 1 ? "basis-11/12" : "flex-grow"}`}
            >
              {index === 0 && (
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-sm text-neutral-950 md:text-lg">
                    SETS
                  </span>
                  <span className="text-sm text-neutral-950 md:text-lg">
                    WEIGHT
                  </span>
                  <span className="text-sm text-neutral-950 md:text-lg">
                    REPS
                  </span>
                </div>
              )}

              <div
                key={index}
                className="flex items-center justify-between flex-grow gap-4 p-1 rounded-lg bg-textInput-exercisebg"
              >
                <span className="flex-shrink-0 ml-2 text-lg font-display text-neutral-950">
                  {set.exerciseSetNumber}
                </span>
                <Input
                  value={set.weight}
                  onChange={(e) =>
                    updateWeight(
                      exerciseId,
                      set.exerciseSetNumber,
                      e.target.value
                    )
                  }
                  className="w-12 !p-0 text-center border-0 rounded-md bg-textInput-exercisebg focus-visible:ring-[none] text-neutral-950"
                />

                <Input
                  value={set.reps}
                  onChange={(e) =>
                    updateReps(
                      exerciseId,
                      set.exerciseSetNumber,
                      e.target.value
                    )
                  }
                  className="w-12 !p-0 text-center border-0 rounded-md bg-textInput-exercisebg focus-visible:ring-[none] text-neutral-950"
                />
              </div>
            </div>
            {exerciseFromWorkout.sets.length > 1 &&
              index === exerciseFromWorkout.sets.length - 1 && (
                <div className="flex-shrink-0 ml-auto">
                  <Button
                    onClick={() =>
                      onSetDelete(exerciseId, set.exerciseSetNumber)
                    }
                    variant={"destructive"}
                    className="p-1 md:p-2"
                  >
                    <Trash2 className="size-4 sm:size-6" />
                  </Button>
                </div>
              )}
          </div>
        </>
      ))}
      <Button
        className="mt-3 ml-auto md:min-w-32"
        onClick={() => onSetAdd(exerciseId)}
      >
        Add set
      </Button>
    </>
  );
};
