import { ArrowLeft, FileDown, Share } from "lucide-react";
import { useLocation } from "wouter";
import { RoutePath } from "../../../constants/navigation";
import { PrimaryButton } from "../../atoms/inputs/PrimaryButton";
import { RefObject } from "react";

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
          <PrimaryButton
            onClick={handleShare}
            buttonIcon={<Share />}
            buttonMessage=""
            tooltipMessage="Share"
            className="flex gap-2 ml-auto cursor-pointer opacity-90 hover:opacity-100"
          />

          <PrimaryButton
            onClick={handleSummaryDownload}
            className="flexcursor-pointer opacity-90 hover:opacity-100"
            buttonIcon={<FileDown />}
            tooltipMessage="Download the summary"
            buttonMessage=""
            tooltipPlacement="top"
          />
        </div>
      </div>
    </div>
  );
};
