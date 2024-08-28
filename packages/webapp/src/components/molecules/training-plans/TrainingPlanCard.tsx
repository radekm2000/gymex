import { DetailedWorkoutModel } from "@gymex/commons/src";
import { useWorkoutPlanDeleteMutation } from "../../../api/mutations/workouts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { useState } from "react";
import { TrainingPlanCardHeader } from "../../atoms/training-plans/TrainingPlanCardHeader";
import { TrainingPlanCardExpandedContent } from "../../atoms/training-plans/TrainingPlanCardExpandedContent";

type Props = {
  trainingPlan: DetailedWorkoutModel;
};

export const TrainingPlanCard = ({ trainingPlan }: Props) => {
  const deleteMutation = useWorkoutPlanDeleteMutation();

  const onDelete = (workoutPlanId: number) => {
    deleteMutation.mutate({ workoutPlanId });
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const totalExercises = trainingPlan.exercises.length;
  const trainingPlanName = trainingPlan.workout.name;

  return (
    <Accordion
      onValueChange={(value) =>
        setIsExpanded(value === `${trainingPlan.workout.id}`)
      }
      type="single"
      collapsible
    >
      <AccordionItem value={`${trainingPlan.workout.id}`}>
        <AccordionTrigger>
          <TrainingPlanCardHeader
            isExpanded={isExpanded}
            onDelete={onDelete}
            onDeleteId={trainingPlan.workout.id}
            totalExercises={totalExercises}
            trainingPlanName={trainingPlanName}
          />
        </AccordionTrigger>
        <AccordionContent>
          <TrainingPlanCardExpandedContent trainingPlan={trainingPlan} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
