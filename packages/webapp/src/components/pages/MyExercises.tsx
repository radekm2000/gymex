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
import { Card } from "../ui/card";

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
    <div className="flex flex-col items-center justify-center gap-8 pb-8">
      <div className="w-full rounded-lg border-border-dark">
        {exercises && exercises.length > 0 ? (
          <ExerciseLinks exercises={exercises} />
        ) : (
          <Card className="flex items-center justify-center text-2xl gap-2 text-white font-display h-[100px]">
            <span>No exercises found, please add some exercises first!</span>
          </Card>
        )}
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
