import { UserBadgeType } from "@gymex/commons/src";

type Props = {
  badgeData: {
    badge: UserBadgeType;
    icon: string;
    description: string;
  };
};

export const BadgeModal = ({ badgeData }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <div className="">
        <img width={50} src={badgeData.icon} />
      </div>
      <div className="flex flex-col text-white font-display">
        <span className="text-2xl">{badgeData.badge}</span>
        <span className="text-secondary-customGray">
          {badgeData.description}
        </span>
      </div>
    </div>
  );
};
