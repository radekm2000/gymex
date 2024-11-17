import { useMediaQuery } from "usehooks-ts";
import { Card } from "../../ui/card";
import { BadgeIcon } from "./BadgeIcon";
import { useAuth } from "../../../hooks/use-auth";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { getBadgeIcon } from "../../../badges/badges";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { BadgeModal } from "../modals/BadgeModal";
import { PrimaryButton } from "../../atoms/inputs/PrimaryButton";

export const BadgesCard = () => {
  const over1200 = useMediaQuery("(min-width: 1024px)");
  const { user } = useAuth();
  const userIcons = getBadgeIcon(user.model.metrics.badges);
  return (
    <Card className={`flex flex-col gap-4 ${over1200 ? "w-[300px]" : ""} `}>
      <span className="mr-auto text-xl font-display">Badges</span>
      <div className="flex flex-wrap gap-1">
        {userIcons.map((iconObject, index) => {
          return (
            <Dialog>
              <DialogTrigger>
                <BadgeIcon
                  key={index}
                  badgeName={iconObject.badge}
                  icon={iconObject.icon}
                />
              </DialogTrigger>
              <DialogHeader>
                <VisuallyHidden.Root>
                  <DialogTitle></DialogTitle>
                </VisuallyHidden.Root>
                <DialogContent>
                  <BadgeModal badgeData={iconObject} />
                </DialogContent>
              </DialogHeader>
            </Dialog>
          );
        })}
      </div>
    </Card>
  );
};
