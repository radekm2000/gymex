import { ArrowLeft, FileDown } from "lucide-react";
import { useLocation } from "wouter";
import { RoutePath } from "../../../constants/navigation";
import { PrimaryButton } from "../../atoms/inputs/PrimaryButton";

type Props = {
  handleSummaryDownload: () => Promise<void>;
};

export const WorkoutSummaryHeader = ({ handleSummaryDownload }: Props) => {
  const [, setLocation] = useLocation();
  return (
    <div className="px-2">
      <div className="flex flex-col w-full pt-4 ">
        <div className="flex items-center w-full gap-4 text-white">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => setLocation(RoutePath.TrainingPlans)}
          />
          <span className="text-xl lg:text-3xl">Training raport</span>
          <PrimaryButton
            onClick={handleSummaryDownload}
            className="flex ml-auto cursor-pointer opacity-80 hover:opacity-100"
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
