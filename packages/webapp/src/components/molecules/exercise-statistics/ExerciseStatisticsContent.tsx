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
      id: "Max weight",
      color: "#843DFF",
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
            tooltip={({ point }) => (
              <div
                style={{
                  borderRadius: "0.75rem",
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#ffffff",
                  padding: "1rem",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "0.25rem",
                      borderRadius: "0.25rem",
                      alignSelf: "stretch",
                      backgroundColor: "#843dff",
                    }}
                  ></div>
                  <div style={{ flex: 1 }}>
                    <strong
                      style={{
                        display: "block",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1rem",
                        color: "#9d99a8",
                      }}
                    >
                      {point.data.xFormatted}
                    </strong>
                    <span
                      style={{
                        fontSize: "1.125rem",
                        lineHeight: "1.875rem",
                        color: "#1e1c24",
                      }}
                    >
                      <span>Max weight</span>:{" "}
                      <span style={{ fontWeight: 600 }}>
                        {point.data.yFormatted}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )}
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
            }}
          />
        </div>
      )}
    </div>
  );
};
