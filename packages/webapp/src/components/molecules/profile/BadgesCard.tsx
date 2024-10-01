import { useMediaQuery } from "usehooks-ts";
import { Card } from "../../ui/card";
import dumbellBadge2 from "../../../assets/db-badge2.png";
import { BadgeIcon } from "./BadgeIcon";

export const BadgesCard = () => {
  const over1200 = useMediaQuery("(min-width: 1024px)");

  return (
    <Card className={`flex flex-col gap-4 ${over1200 ? "w-[300px]" : ""} `}>
      <span className="mr-auto text-xl font-display">Badges</span>
      <div className="flex flex-wrap">
        <BadgeIcon badgeName="Novice" icon={dumbellBadge2} />
      </div>
    </Card>
  );
};
