import { ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  icon: ReactNode;
  data: string;
  dataSize?: string;
};

export const CustomIconWithData = ({ icon, data }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex items-center justify-center gap-1">
      <div>{icon}</div>
      <span className={`${isDesktop ? "text-base" : "text-g"}`}>{data}</span>
    </div>
  );
};
