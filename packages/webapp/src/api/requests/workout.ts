import { apiClient } from "../http-client";
import { CreateWorkoutWithExercisesDto } from "@gymex/commons/";
import {
  DetailedWorkoutModel,
  WorkoutCreateDtoSchemaWithoutExerciseName,
  WorkoutModel,
} from "@gymex/commons/src";

export const WorkoutQueryKeys = {
  all: ["workouts"] as const,
  details: () => [...WorkoutQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...WorkoutQueryKeys.details(), id] as const,
};

export const startWorkoutById = async (
  workoutId: number
): Promise<DetailedWorkoutModel> => {
  const response = await apiClient.post<DetailedWorkoutModel>(
    `workouts/${workoutId}/start-workout`
  );
  return response.data;
};

export const finishWorkoutById = async (
  workoutId: number,
  dto: CreateWorkoutWithExercisesDto
): Promise<DetailedWorkoutModel> => {
  const response = await apiClient.post<DetailedWorkoutModel>(
    `workouts/${workoutId}/finish-workout`,
    dto
  );
  return response.data;
};

export const getWorkoutPlans = async () => {
  const response = await apiClient.get<DetailedWorkoutModel[]>("workouts");
  return response.data;
};

export const createWorkoutPlan = async (
  dto: WorkoutCreateDtoSchemaWithoutExerciseName
): Promise<DetailedWorkoutModel> => {
  const response = await apiClient.post("workouts", dto);
  return response.data;
};

export const deleteWorkoutPlan = async (workoutPlanId: number) => {
  const response = await apiClient.delete<WorkoutModel>(
    `workouts/${workoutPlanId}`
  );
  return response.data;
};
