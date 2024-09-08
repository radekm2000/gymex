import { GroupedWorkouts } from "@gymex/commons/src";

type Props = {
  groupedWorkouts: GroupedWorkouts;
};

export const WorkoutsHistoryMonthsList = ({ groupedWorkouts }: Props) => {
  return (
    <div className="py-4">
      {Object.entries(groupedWorkouts.date).map(([monthYear, workouts]) => {
        const totalSessions = workouts.length;
        return (
          workouts.length > 0 && (
            <div
              key={monthYear}
              className="flex flex-col py-4 border border-red-500"
            >
              <div className="flex">
                <h1>{monthYear}</h1>
                <h1>total sesji w tym miesiacu : {totalSessions} </h1>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};
