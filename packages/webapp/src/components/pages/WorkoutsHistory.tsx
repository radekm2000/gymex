import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/use-auth";
import { Card, CardTitle } from "../ui/card";
import { NotAuthed } from "./NotAuthed";
import {
  getWorkoutPlansWithSessionsGroupedByMonths,
  WorkoutQueryKeys,
} from "../../api/requests/workout";
import { LoadingProgress } from "../molecules/utils/LoadingProgress";
import { Info } from "lucide-react";
import { Separator } from "../ui/separator";
import { WorkoutsHistoryMonthsList } from "../molecules/workout-history/WorkoutsHistoryMonthsList";
export const WorkoutsHistory = () => {
  const { isAuthed } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: WorkoutQueryKeys.plansGroupedByMonths(),
    queryFn: getWorkoutPlansWithSessionsGroupedByMonths,
  });

  if (!isAuthed) {
    return <NotAuthed />;
  }

  if (isLoading) {
    return <LoadingProgress />;
  }

  return (
    <Card className="flex flex-col gap-2 mb-6">
      <CardTitle className="flex gap-3">
        <div>
          <Info />
        </div>
        <span>Workouts history</span>
      </CardTitle>
      <Separator className="mb-0" />

      {data ? (
        <>
          <WorkoutsHistoryMonthsList groupedWorkouts={data} />
        </>
      ) : (
        <div className="flex items-center justify-center min-h-56">
          <span className="text-center text-white font-display">
            You don't have any training sessions yet. Finish your training first
            !
          </span>
        </div>
      )}
    </Card>
  );
};
