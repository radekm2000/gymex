import { useQuery } from "@tanstack/react-query";
import {
  ExercisesQueryKeys,
  getMyExercises,
} from "../../api/requests/exercises";
import { useAuth } from "../../hooks/use-auth";
import { ExerciseLinks } from "../molecules/exercises/ExerciseLinks";
import { useEffect, useState } from "react";
import { LoadingProgress } from "../molecules/utils/LoadingProgress";

export const MyExercises = () => {
  const { user } = useAuth();

  const { data: exercises, isLoading } = useQuery({
    queryKey: ExercisesQueryKeys.details(),
    queryFn: getMyExercises,
    enabled: !!user.model.user.id,
  });
  if (isLoading) {
    return <LoadingProgress />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="w-full bg-white">
        {exercises && <ExerciseLinks exercises={exercises} />}
      </div>
      <button className="w-full text-white rounded bg-secondary font-display">
        ADD EXERCISE
      </button>
    </div>
  );
};
