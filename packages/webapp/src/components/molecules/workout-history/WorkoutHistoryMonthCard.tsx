import { MonthYear, WorkoutHistory } from "@gymex/commons/src";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { useState } from "react";
import { WorkoutHistoryMonthCardHeader } from "./WorkoutHistoryMonthCardHeader";
import { WorkoutHistoryMonthCardExpandedContent } from "./WorkoutHistoryMonthCardExpandedContent";

type Props = {
  workouts: WorkoutHistory[];
  monthYear: MonthYear;
};

export const WorkoutHistoryMonthCard = ({ workouts, monthYear }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Accordion
      type="single"
      collapsible
      onValueChange={(value) => setIsExpanded(value === `${monthYear}`)}
    >
      <AccordionItem value={monthYear}>
        <AccordionTrigger>
          <WorkoutHistoryMonthCardHeader
            monthYear={monthYear}
            workouts={workouts}
            isExpanded={isExpanded}
          />
        </AccordionTrigger>
        <AccordionContent>
          <WorkoutHistoryMonthCardExpandedContent workouts={workouts} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
