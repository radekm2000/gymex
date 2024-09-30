/* eslint-disable @typescript-eslint/no-unused-vars */
import { DetailedWorkoutModel } from "@gymex/commons/src";
import { Card } from "../../ui/card";
import { DumbbellIcon } from "lucide-react";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { useWorkoutStartMutation } from "../../../api/mutations/workouts";
import { CustomIcon } from "../icons/CustomIcon";
import dumbell from "../../../assets/dumbell.png";
type Props = {
  trainingPlan: DetailedWorkoutModel;
};

export const TrainingPlanCardExpandedContent = ({ trainingPlan }: Props) => {
  const startWorkoutMutation = useWorkoutStartMutation();

  const onStart = (trainingPlanId: number) => {
    startWorkoutMutation.mutate({ workoutId: trainingPlanId });
  };
  const isLastElement = trainingPlan.exercises.length - 1;

  return (
    <Card className="flex flex-col gap-5 p-0 bg-opacity-100 border-t-0 rounded-t-none opacity-100 bg-textInput-exercisebg ">
      {trainingPlan.exercises.map((e, index) => (
        <div key={index} className="first:pt-2">
          <div key={index} className="flex items-center justify-between gap-4 ">
            <div className="pl-2">
              <CustomIcon icon={dumbell} />
            </div>
            <span className=" text-textInput-darker md:text-2xl">
              {e.exerciseName}
            </span>
            <div className="flex ml-auto mr-1">
              {e.sets.map((s, setIndex) => (
                <div key={setIndex}>
                  <span
                    key={setIndex}
                    className="text-sm font-display text-textInput-darker"
                  >
                    {s.reps}
                  </span>
                  {setIndex === e.sets.length - 1 ? null : (
                    <span className="text-neutral-950">,</span>
                  )}
                </div>
              ))}
              <span>&nbsp;</span>
            </div>
          </div>
          <Separator
            className={index === isLastElement ? "bg-primary-dark" : ""}
          />
        </div>
      ))}
      {/* <Button
        onClick={() =>
          setLocation(`/active-workout/${trainingPlan.workout.id}`, {
            state: {
              workoutModel: trainingPlan,
            },
          })
        }
        className="mb-4 text-2xl bg-transparent rounded-none hover:bg-transparent hover:shadow-none text-neutral-950 font-display"
      >
        Start training
      </Button> */}
      <Button
        onClick={() => onStart(trainingPlan.workout.id)}
        className="mb-4 text-2xl bg-transparent rounded-none hover:bg-transparent hover:shadow-none text-neutral-950 font-display"
      >
        Start training
      </Button>
    </Card>
  );
};
