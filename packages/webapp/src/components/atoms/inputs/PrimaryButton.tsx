import { Dumbbell, DumbbellIcon, LucideIcon } from "lucide-react";
import { useAuth } from "../../../hooks/use-auth";
import { FadingTooltip } from "../tooltip/FadingTooltip";
import { Button } from "../../ui/button";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  disableOnNotAuthed?: boolean;
  tooltipMessage?: string;
  tooltipPlacement?: "right" | "top" | "bottom" | "left";
  icon?: LucideIcon;
};

export const PrimaryButton = ({
  disableOnNotAuthed = false,
  tooltipMessage,
  tooltipPlacement = "top",
}: Props) => {
  const { user } = useAuth();
  const isMobile = useMediaQuery("(min-width: 768px)");

  const getTooltipMessage = () => {
    if (disableOnNotAuthed && !user.model.user.id) {
      return "You have to sign in first";
    }
    return tooltipMessage !== undefined ? tooltipMessage : "";
  };

  const tooltipMsg = getTooltipMessage();

  if (tooltipMsg) {
    return (
      <FadingTooltip
        tooltipText={tooltipMessage}
        tooltipPlacement={isMobile ? "top" : tooltipPlacement}
      >
        <div className="block">
          <Button
            className="flex gap-3 p-4"
            type="button"
            disabled={disableOnNotAuthed && !user.model.user.id}
          >
            <DumbbellIcon />
            hello world123
          </Button>
        </div>
      </FadingTooltip>
    );
  }
};
