import { CirclePlus, Info } from "lucide-react";
import { Card, CardTitle } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import { getWorkoutPlans, WorkoutQueryKeys } from "../../api/requests/workout";
import { useAuth } from "../../hooks/use-auth";
import { LoadingProgress } from "../molecules/utils/LoadingProgress";
import { NotAuthed } from "./NotAuthed";
import { TrainingPlansList } from "../molecules/training-plans/TrainingPlansList";
import { Separator } from "../ui/separator";
import { useLocation } from "wouter";
import { RoutePath } from "../../constants/navigation";

export const TrainingPlans = () => {
  const { user, isAuthed } = useAuth();
  const [, setLocation] = useLocation();

  const { data: trainingPlans, isLoading } = useQuery({
    queryKey: WorkoutQueryKeys.details(),
    queryFn: getWorkoutPlans,
    enabled: !!user.model.user.id,
  });

  const filteredTrainingPlans = trainingPlans?.filter(
    (t) => t.workout.creatorId === user.model.user.id
  );

  if (isLoading) {
    return <LoadingProgress />;
  }

  if (!isAuthed) {
    return <NotAuthed />;
  }

  return (
    <Card className="flex flex-col gap-2 mb-6">
      <CardTitle className="flex gap-3">
        <div>
          <Info />
        </div>
        <span>Plans</span>
        <div className="ml-auto">
          <CirclePlus
            onClick={() => setLocation(RoutePath.AddTrainingPlan)}
            className="opacity-50 cursor-pointer hover:opacity-80"
            color="#98FF98"
          />
        </div>
      </CardTitle>
      <Separator className="mb-4" />
      {filteredTrainingPlans && filteredTrainingPlans.length > 0 ? (
        <TrainingPlansList trainingPlans={filteredTrainingPlans} />
      ) : (
        <div className="flex items-center justify-center min-h-56">
          <span className="text-center text-white font-display">
            You don't have any training plans yet. Create one by clicking on the
            green circle
          </span>
        </div>
      )}
    </Card>
  );
};
