import { MonthYear } from "@gymex/commons/src";

export const formatMonthYear = (monthYear: MonthYear) => {
  const [month, year] = monthYear.split("-");

  return `${month.toUpperCase()} ${year}`;
};
