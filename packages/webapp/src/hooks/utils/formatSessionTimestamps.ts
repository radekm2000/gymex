import { DetailedWorkoutModel } from "@gymex/commons/src";
import { format, parseISO } from "date-fns";

export const formatSessionTimeStamps = (model: DetailedWorkoutModel) => {
  const { session } = model;
  const startedAt = session.startedAt;
  const finishedAt = session.finishedAt;

  const parsedDate = parseISO(String(startedAt).replace(" ", "T"));

  const formattedDate = format(parsedDate, "dd.MM.yyyy");

  const startTime = format(startedAt, "HH:mm");
  const endTime = format(finishedAt, "HH:mm");

  const timeDuration = `${startTime} - ${endTime}`;

  return { formattedDate, timeDuration };
};
