import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import {
  ExercisesQueryKeys,
  getExerciseHistory,
} from "../../api/requests/exercises";
import { LoadingProgress } from "../molecules/utils/LoadingProgress";
import { Logo } from "../atoms/icons/Logo";
import { Card } from "../ui/card";
import { ExerciseStatisticsHeader } from "../molecules/exercise-statistics/ExerciseStatisticsHeader";
import { ExerciseStatisticsContent } from "../molecules/exercise-statistics/ExerciseStatisticsContent";
import { useMediaQuery } from "usehooks-ts";

export const ExerciseStatistics = () => {
  const params = useParams();
  const exerciseId = params?.exerciseId;
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { data, isLoading } = useQuery({
    queryKey: ExercisesQueryKeys.history(Number(exerciseId)),
    queryFn: () => getExerciseHistory(Number(exerciseId)),
    enabled: !!exerciseId,
  });

  if (isLoading) {
    return <LoadingProgress />;
  }

  console.log(data?.overallStats.exerciseName);
  return (
    <Card className={`${isDesktop ? "" : "px-1"}`}>
      {data?.history.length && data.history.length > 0 && exerciseId ? (
        <>
          <ExerciseStatisticsHeader data={data} />
          <ExerciseStatisticsContent data={data} />
        </>
      ) : (
        <div className="flex items-center justify-center min-h-56">
          <div className="flex items-center justify-center size-20">
            <Logo />
          </div>
          <span className="text-center text-white font-display">
            You dont have any statistics in this exercise yet.
          </span>
        </div>
      )}
    </Card>
  );
};
