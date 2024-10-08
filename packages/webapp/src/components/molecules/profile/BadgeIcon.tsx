import { FadingTooltip } from "../../atoms/tooltip/FadingTooltip";

type Props = {
  badgeName: string;
  icon: string;
};

export const BadgeIcon = ({ badgeName, icon }: Props) => {
  return (
    <FadingTooltip tooltipPlacement="top" opacity={100} tooltipText={badgeName}>
      <img className="cursor-pointer" src={icon} />
    </FadingTooltip>
  );
};
