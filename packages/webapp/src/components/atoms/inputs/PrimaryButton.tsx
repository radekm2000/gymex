import { useAuth } from "../../../hooks/use-auth";
import { FadingTooltip } from "../tooltip/FadingTooltip";
import { Button, ButtonProps } from "../../ui/button";
import { ReactNode } from "react";

type Props = {
  disableOnNotAuthed?: boolean;
  tooltipMessage?: string;
  tooltipPlacement?: "right" | "top" | "bottom" | "left";
  buttonMessage?: string;
  buttonIcon?: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton = ({
  disableOnNotAuthed = false,
  tooltipMessage,
  tooltipPlacement = "top",
  buttonMessage = "testmesg",
  buttonIcon,
  ...props
}: Props) => {
  const { user } = useAuth();

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
        tooltipText={tooltipMsg}
        tooltipPlacement={tooltipPlacement}
      >
        <div className="block">
          <Button
            className="gap-3 p-4"
            type="button"
            disabled={disableOnNotAuthed && !user.model.user.id}
            {...props}
          >
            {buttonIcon} {buttonMessage}
          </Button>
        </div>
      </FadingTooltip>
    );
  } else {
    return (
      <Button
        className="gap-3 p-4"
        type="button"
        disabled={disableOnNotAuthed && !user.model.user.id}
        {...props}
      >
        {buttonIcon} {buttonMessage}
      </Button>
    );
  }
};
