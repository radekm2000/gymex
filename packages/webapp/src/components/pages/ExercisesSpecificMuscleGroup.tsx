import { useAuth } from "../../hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import {
  ExercisesQueryKeys,
  getDefaultExercises,
} from "../../api/requests/exercises";
import { LoadingProgress } from "../molecules/utils/LoadingProgress";
import { useRoute } from "wouter";
import { RoutePath } from "../../constants/navigation";
import { ExerciseLinks } from "../molecules/exercises/ExerciseLinks";


export const ExercisesSpecificMuscleGroup = () => {
  const { user } = useAuth();
  const [, params] = useRoute(RoutePath.SpecificExercises);

  const { data: exercises, isLoading } = useQuery({
    queryKey: ExercisesQueryKeys.details(),
    queryFn: getDefaultExercises,
    enabled: !!user.model.user.id,
  });


  if (isLoading) {
    return <LoadingProgress />;
  }
  const filteredExercisesByMuscleGroup = exercises?.filter(
    (e) => e.primaryMuscleTargeted === params?.primaryMuscleTargeted
  );

  return (
    <div className="flex flex-col items-center justify-center gap-8 pb-8">
      <div className="w-full bg-white">
        {filteredExercisesByMuscleGroup && (
          <ExerciseLinks exercises={filteredExercisesByMuscleGroup} />
        )}
      </div>
    </div>
  );
};
