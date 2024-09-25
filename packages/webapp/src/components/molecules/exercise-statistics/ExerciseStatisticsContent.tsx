import { ExerciseHistory, ExerciseOverallStats } from "@gymex/commons/src";
import { ResponsiveLine } from "@nivo/line";
import { format } from "date-fns";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  data: {
    history: ExerciseHistory;
    overallStats: ExerciseOverallStats;
  };
};

export const ExerciseStatisticsContent = ({ data }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const chartData = [
    {
      id: "Max Weight",
      data: data.history.map((record) => ({
        x: format(record.finishedAt, "dd.MM.yy"),
        y: record.maxWeight,
      })),
    },
  ];
  return (
    <div className="mt-4">
      {isDesktop && (
        <div className="h-[400px] w-3/4">
          <ResponsiveLine
            data={chartData}
            margin={{ top: 50, right: 110, bottom: 50, left: 50 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            axisBottom={{
              legendOffset: 10,
              tickRotation: 40,
            }}
            axisLeft={{
              legend: "Max Weight",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            pointSize={14}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            theme={{
              text: {
                fill: "#4bbbe5",
              },

              tooltip: {
                container: {
                  background: "white",
                  color: "#262626",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};
