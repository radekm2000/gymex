import { EllipsisVertical, FileDown, Share } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

type Props = {
  handleSummaryDownload: () => Promise<void>;
  handleShare: () => Promise<void>;
};

export const WorkoutSummaryDropdownMenu = ({
  handleShare,
  handleSummaryDownload,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem onClick={handleShare}>
            <Share />
            <span className="text-white font-display">Share</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSummaryDownload}>
            <FileDown />
            <span className="text-white font-display">Download</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
