import { useMediaQuery } from "usehooks-ts";
import { Card } from "../../ui/card";
import { BadgeIcon } from "./BadgeIcon";
import { useAuth } from "../../../hooks/use-auth";
import { getBadgeIcon } from "../../../badges/badges";

export const BadgesCard = () => {
  const over1200 = useMediaQuery("(min-width: 1024px)");
  const { user } = useAuth();
  const userIcons = getBadgeIcon(user.model.metrics.badges);
  return (
    <Card className={`flex flex-col gap-4 ${over1200 ? "w-[300px]" : ""} `}>
      <span className="mr-auto text-xl font-display">Badges</span>
      <div className="flex flex-wrap gap-1">
        {userIcons.map((iconObject, index) => {
          const [badgeName, icon] = Object.entries(iconObject)[0];

          return <BadgeIcon key={index} badgeName={badgeName} icon={icon} />;
        })}
      </div>
    </Card>
  );
};
