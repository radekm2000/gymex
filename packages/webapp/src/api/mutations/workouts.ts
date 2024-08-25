import {
  DetailedWorkoutModel,
  WorkoutCreateDtoSchemaWithoutExerciseName,
  WorkoutModel,
} from "@gymex/commons/src";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import {
  createWorkoutPlan,
  deleteWorkoutPlan,
  WorkoutQueryKeys,
} from "../requests/workout";
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
      console.log(createdTrainingPlan)
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

type WorkoutDeleteMutationParams = {
  workoutPlanId: number;
};

export const useWorkoutPlanDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: WorkoutDeleteMutationParams) =>
      deleteWorkoutPlan(params.workoutPlanId),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (deletedTrainingPlan: WorkoutModel) => {
      toast.success("Plan has been deleted");
      queryClient.removeQueries({
        queryKey: WorkoutQueryKeys.detail(deletedTrainingPlan.id),
      });
      queryClient.setQueryData<DetailedWorkoutModel[]>(
        WorkoutQueryKeys.details(),
        (prev) => {
          if (prev !== undefined) {
            return prev.filter((m) => m.workout.id !== deletedTrainingPlan.id);
          }
        }
      );
    },
  });
};
