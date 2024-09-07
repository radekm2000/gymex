import { ResponsivePie } from "@nivo/pie";
import { useMediaQuery } from "usehooks-ts";
import { MuscleStats } from "@gymex/commons/src";
import { formatDataToChartData } from "../../../hooks/utils/formatDataToChartData";

type Props = {
  muscleStats: MuscleStats;
};

export const WorkoutSummaryChartPie = ({ muscleStats }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (!muscleStats) {
    return;
  }
  const pieTheme = {
    text: {
      fontSize: 30,
    },
  };
  const mobilePieTheme = {
    text: {
      fontSize: 15,
    },
  };

  const transformedMuscleStats = formatDataToChartData(muscleStats);
  return (
    transformedMuscleStats && (
      <ResponsivePie
        theme={isDesktop ? pieTheme : mobilePieTheme}
        tooltip={() => <></>}
        data={transformedMuscleStats}
        margin={{ bottom: 80, left: 80, right: 80, top: 40 }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.8]],
        }}
        enableArcLabels
        arcLinkLabelsTextColor="#ededed"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLinkLabelsStraightLength={0}
        arcLinkLabelsDiagonalLength={20}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 20]],
        }}
      />
    )
  );
};
