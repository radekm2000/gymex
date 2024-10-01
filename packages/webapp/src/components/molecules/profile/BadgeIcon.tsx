import { FadingTooltip } from "../../atoms/tooltip/FadingTooltip";

type Props = {
  badgeName: string;
  icon: string;
};

export const BadgeIcon = ({ badgeName, icon }: Props) => {
  return (
    <FadingTooltip tooltipPlacement="top" tooltipText={badgeName}>
      <img className="cursor-pointer" src={icon} />
    </FadingTooltip>
  );
};
