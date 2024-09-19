import { WorkoutHistory } from "@gymex/commons/src";
import { Card } from "../../ui/card";
import { WorkoutSessionItem } from "./WorkoutSessionItem";
import { Separator } from "../../ui/separator";

type Props = {
  workouts: WorkoutHistory[];
};

export const WorkoutHistoryMonthCardExpandedContent = ({ workouts }: Props) => {
  return (
    <Card className="flex flex-col gap-2 p-0 bg-opacity-100 border-t-0 rounded-t-none bg-neutral-100 ">
      {workouts.map((workout, index) => (
        <div key={index}>
          <WorkoutSessionItem workout={workout} />
          {index !== workouts.length - 1 && <Separator />}
        </div>
      ))}
    </Card>
  );
};
