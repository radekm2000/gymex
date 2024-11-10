import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { RoutePath } from "../../../constants/navigation";
import { RefObject } from "react";
import { WorkoutSummaryDropdownMenu } from "./WorkoutSummaryDropdownMenu";

type Props = {
  handleSummaryDownload: () => Promise<void>;
  handleShare: () => Promise<void>;
  shareCanvas: (shareTarget: RefObject<HTMLDivElement>) => Promise<void>;
  shareTarget: React.MutableRefObject<null>;
};

export const WorkoutSummaryHeader = ({
  handleSummaryDownload,
  handleShare,
  shareCanvas,
  shareTarget,
}: Props) => {
  const [, setLocation] = useLocation();

  return (
    <div
      onMouseEnter={() => shareCanvas.bind(shareCanvas, shareTarget)}
      id=""
      className="px-2"
    >
      <div className="flex flex-col w-full pt-4 ">
        <div className="flex items-center w-full gap-4 text-white">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => setLocation(RoutePath.TrainingPlans)}
          />
          <span className="text-xl lg:text-3xl">Training raport</span>
          <div className="flex ml-auto">
            <WorkoutSummaryDropdownMenu
              handleShare={handleShare}
              handleSummaryDownload={handleSummaryDownload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
