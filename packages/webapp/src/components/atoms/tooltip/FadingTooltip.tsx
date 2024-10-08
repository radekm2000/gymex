import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

type Props = {
  tooltipText?: string;
  children: ReactNode;
  tooltipPlacement?: "right" | "top" | "bottom" | "left";
};

export const FadingTooltip = ({
  tooltipText,
  children,
  tooltipPlacement = "right",
}: Props) => {
  return (
    <TooltipProvider disableHoverableContent={true}>
      <Tooltip >
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            className="z-50 data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-white select-none  rounded-[4px] bg-secondary-customGray opacity-80 px-[15px] py-[8px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] font-display font-thin"
            side={tooltipPlacement}
            sideOffset={5}
          >
            <p>{tooltipText}</p>
            <TooltipArrow className="fill-secondary-customGray opacity-80" />
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
  </TooltipProvider>
  );
};
