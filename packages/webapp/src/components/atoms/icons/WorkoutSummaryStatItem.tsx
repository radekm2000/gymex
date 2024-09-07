import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  data: string | number;
  suffix?: string;
};

export const WorkoutSummaryStatItem = ({ icon, title, data, suffix }: Props) => {
  return (
    <div className="flex gap-2 text-opacity-70 text-border-default ">
      <div className="flex items-center justify-center">{icon}</div>
      <div className="flex flex-col items-start justify-center">
        <span className="text-sm font-display">{title}</span>
        <span className="text-lg text-neutral-950 font-display">{data} {suffix}</span>
      </div>
    </div>
  );
};
