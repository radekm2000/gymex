import { useQuery } from "@tanstack/react-query";
import {
  ExercisesQueryKeys,
  getMyExercises,
} from "../../api/requests/exercises";
import { useAuth } from "../../hooks/use-auth";
import { ExerciseLinks } from "../molecules/exercises/ExerciseLinks";
import { LoadingProgress } from "../molecules/utils/LoadingProgress";
import { Button } from "../ui/button";
import { useLocation } from "wouter";
import { RoutePath } from "../../constants/navigation";

export const MyExercises = () => {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

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
      <Button
        onClick={() => setLocation(`${RoutePath.AddExercise}`)}
        className="w-full text-sm"
      >
        ADD EXERCISE
      </Button>
    </div>
  );
};
