import {
  DetailedWorkoutModel,
  WorkoutCreateDtoSchemaWithoutExerciseName,
} from "@gymex/commons/src";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { createWorkoutPlan, WorkoutQueryKeys } from "../requests/workout";
import toast from "react-hot-toast";
import { RoutePath } from "../../constants/navigation";

export const useWorkoutPlanCreateMutation = () => {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  return useMutation({
    mutationFn: (params: WorkoutCreateDtoSchemaWithoutExerciseName) =>
      createWorkoutPlan(params),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (createdTrainingPlan: DetailedWorkoutModel) => {
      setLocation(RoutePath.TrainingPlans);
      queryClient.setQueryData<DetailedWorkoutModel[]>(
        WorkoutQueryKeys.details(),
        (prev) => {
          if (prev !== undefined) {
            return [...prev, createdTrainingPlan];
          }
        }
      );
    },
  });
};
