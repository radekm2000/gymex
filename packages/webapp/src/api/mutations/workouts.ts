/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DetailedWorkoutModel,
  WorkoutCreateDtoSchemaWithoutExerciseName,
  WorkoutModel,
  WorkoutSummary,
} from "@gymex/commons/src";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import {
  createWorkoutPlan,
  deleteWorkoutPlan,
  finishWorkoutById,
  startWorkoutById,
  WorkoutQueryKeys,
} from "../requests/workout";
import toast from "react-hot-toast";
import { RoutePath } from "../../constants/navigation";
import { CreateWorkoutWithExercisesDto } from "@gymex/commons";
import { useWorkoutStore } from "../../hooks/utils/useWorkoutStore";

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

type WorkoutStartMutationParams = {
  workoutId: number;
};

export const useWorkoutStartMutation = () => {
  const [, setLocation] = useLocation();

  return useMutation({
    mutationFn: (params: WorkoutStartMutationParams) =>
      startWorkoutById(params.workoutId),
    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (returnedWorkoutModel: DetailedWorkoutModel) => {
      setLocation(`/active-workout/${returnedWorkoutModel.workout.id}`, {
        state: {
          workoutModel: returnedWorkoutModel,
          setWorkoutModelUpdatedToTrue: true,
        },
      });
    },
  });
};

type WorkoutFinishMutationParams = {
  workoutId: number;
  dto: CreateWorkoutWithExercisesDto;
};

export const useWorkoutFinishMutation = () => {
  const { clearWorkoutModel } = useWorkoutStore();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: WorkoutFinishMutationParams) =>
      finishWorkoutById(params.workoutId, params.dto),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (returnedData: {
      detailedWorkoutModel: DetailedWorkoutModel;
      summary: WorkoutSummary;
    }) => {
      clearWorkoutModel();
      toast.success("Workout finished!");
      queryClient.setQueryData<DetailedWorkoutModel[]>(
        WorkoutQueryKeys.details(),
        (prev) => {
          if (prev !== undefined) {
            const exists = prev.some(
              (plan) =>
                plan.workout.id === returnedData.detailedWorkoutModel.workout.id
            );
            if (exists) {
              return prev.map((plan) =>
                plan.workout.id === returnedData.detailedWorkoutModel.workout.id
                  ? returnedData.detailedWorkoutModel
                  : plan
              );
            } else {
              return [...prev, returnedData.detailedWorkoutModel];
            }
          }
        }
      );
      setLocation(
        `/workout/${returnedData.detailedWorkoutModel.workout.id}/summary`,
        {
          state: {
            summary: returnedData.summary,
            trainingPlan: returnedData.detailedWorkoutModel,
          },
        }
      );
    },
  });
};
