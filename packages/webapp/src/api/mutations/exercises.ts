import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createExercise,
  deleteExercise,
  ExercisesQueryKeys,
} from "../requests/exercises";
import toast from "react-hot-toast";
import {
  ExerciseModel,
  PrimaryMuscleTargeted,
  RestTimeOptions,
} from "@gymex/commons/src";
import { useLocation } from "wouter";
import { RoutePath } from "../../constants/navigation";

type ExerciseDeleteMutationParams = {
  exerciseId: number;
};

export const useExerciseDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ExerciseDeleteMutationParams) =>
      deleteExercise(params.exerciseId),
    onError: (err: Error) => {
      toast.error(err.message);
    },
    onSuccess: (_, { exerciseId }) => {
      toast.success("Exercise has been deleted");

      queryClient.setQueryData<ExerciseModel[]>(
        ExercisesQueryKeys.me(),
        (prev) => {

          if (prev !== undefined) {
            return prev.filter((e) => e.id !== exerciseId);
          }
        }
      );
    },
  });
};

export type ExerciseCreateMutationParams = {
  exerciseName: string;
  muscleTargeted: PrimaryMuscleTargeted;
  restTime: RestTimeOptions;
  isDefault: boolean;
  userId: number;
  notes: string;
  isCreatorDeveloper: boolean;
};

export const useExerciseCreateMutation = () => {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  return useMutation({
    mutationFn: (params: ExerciseCreateMutationParams) =>
      createExercise(params),
    onError: (err: Error) => {
      toast.error(err.message);
    },
    onSuccess: (createdExercise: ExerciseModel) => {
      setLocation(RoutePath.MyExercises);
      toast.success("Exercise has been created");
      queryClient.setQueryData<ExerciseModel[]>(
        ExercisesQueryKeys.me(),
        (prev) => {

          if (prev !== undefined) {
            return [...prev, createdExercise];
          }
        }
      );
    },
  });
};
