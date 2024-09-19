import { GroupedWorkouts, MonthYear } from "@gymex/commons/src";
import { WorkoutHistoryMonthCard } from "./WorkoutHistoryMonthCard";

type Props = {
  groupedWorkouts: GroupedWorkouts;
};

export const WorkoutsHistoryMonthsList = ({ groupedWorkouts }: Props) => {
  return (
    <div className="py-4">
      {Object.entries(groupedWorkouts.date).map(([monthYear, workouts]) => {
        return (
          workouts.length > 0 && (
            <WorkoutHistoryMonthCard
              key={monthYear}
              monthYear={monthYear as MonthYear}
              workouts={workouts}
            />
          )
        );
      })}
    </div>
  );
};
