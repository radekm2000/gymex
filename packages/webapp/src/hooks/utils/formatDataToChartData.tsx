import { MuscleStats } from "@gymex/commons/src";

const muscleColorMap: Record<string, string> = {
  back: "hsl(264, 70%, 50%)",
  chest: "hsl(298, 70%, 50%)",
  legs: "hsl(159, 70%, 50%)",
  shoulders: "hsl(200, 70%, 50%)",
  bicep: "hsl(100, 70%, 50%)",
  triceps: "hsl(30, 70%, 50%)",
  abs: "hsl(60, 70%, 50%)",
  base: "hsl(180, 70%, 50%)",
};

export const formatDataToChartData = (muscleStats: MuscleStats) => {
  const chartData = Object.entries(muscleStats).map(([key, value]) => {
    return {
      id: key.toUpperCase(),
      label: key.toUpperCase(),
      value: value || 0,
      color: muscleColorMap[key] || "hsl(0, 0%, 50%)",
    };
  });

  return chartData;
};
