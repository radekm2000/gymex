import { WorkoutHistory } from "@gymex/commons/src";
import { Card } from "../../ui/card";
import { WorkoutSessionItem } from "./WorkoutSessionItem";
import { Separator } from "../../ui/separator";

type Props = {
  workouts: WorkoutHistory[];
};

export const WorkoutHistoryMonthCardExpandedContent = ({ workouts }: Props) => {
  const sortedWorkouts = workouts.sort((a, b) => {
    const timeA = new Date(a.detailedWorkoutModel.session.finishedAt).getTime();
    const timeB = new Date(b.detailedWorkoutModel.session.finishedAt).getTime();

    return timeA - timeB;
  });

  return (
    <Card className="flex flex-col gap-2 p-0 bg-opacity-100 border-t-0 rounded-t-none bg-textInput-expandedContent ">
      {sortedWorkouts.map((workout, index) => (
        <div key={index}>
          <WorkoutSessionItem workout={workout} />
          {index !== workouts.length - 1 && <Separator />}
        </div>
      ))}
    </Card>
  );
};
