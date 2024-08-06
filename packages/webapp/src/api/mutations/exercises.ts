import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExercise, ExercisesQueryKeys } from "../requests/exercises";
import toast from "react-hot-toast";
import { ExerciseModel } from "@gymex/commons/src";

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
      queryClient.removeQueries({
        queryKey: ExercisesQueryKeys.detail(exerciseId),
      });
      queryClient.setQueryData<ExerciseModel[]>(
        ExercisesQueryKeys.details(),
        (prev) => {
          if (prev !== undefined) {
            return prev.filter((e) => e.id !== exerciseId);
          }
        }
      );
    },
  });
};
