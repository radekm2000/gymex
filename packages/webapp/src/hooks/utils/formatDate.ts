import { format, parseISO } from "date-fns";

export const formatDate = async (date: Date) => {
  const parsedDate = parseISO(String(date).replace(" ", "T"));

  const formattedDate = format(parsedDate, "dd.MM.yyyy");

  return formattedDate;
};
