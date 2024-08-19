import { ExerciseModel } from "@gymex/commons/src";
import { apiClient } from "../http-client";
import { ExerciseCreateMutationParams } from "../mutations/exercises";

export const ExercisesQueryKeys = {
  all: ["exercises"] as const,
  details: () => [...ExercisesQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...ExercisesQueryKeys.details(), id] as const,
};

export const getMyExercises = async () => {
  const response = await apiClient.get<ExerciseModel[]>(`exercises/me`);
  return response.data;
};

export const deleteExercise = async (
  exerciseId: number
): Promise<ExerciseModel> => {
  const response = await apiClient.delete<ExerciseModel>(
    `exercises/${exerciseId}`
  );
  return response.data;
};

export const createExercise = async (
  dto: ExerciseCreateMutationParams
) => {
  const response = await apiClient.post<ExerciseModel>("exercises/", dto);
  return response.data;
};
