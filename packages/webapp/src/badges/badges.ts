import { UserBadgeType } from "@gymex/commons/src";
import dumbellBadge2 from "../assets/db-badge2.png";
import rankingBadge from "../assets/ranking-badge.png";
import rankingBadge2 from "../assets/ranking-badge-2.png";

export type BadgeIcon = {
  [key in UserBadgeType]: { icon: string; description: string };
};

export const BADGE_ICONS: BadgeIcon = {
  [UserBadgeType.ELITE]: {
    icon: dumbellBadge2,
    description: "Achieved for unlocking over 3 achievements.",
  },
  [UserBadgeType.NOVICE]: {
    icon: rankingBadge,
    description: "Awarded for unlocking your first achievement!",
  },
  [UserBadgeType.OG]: {
    icon: rankingBadge2,
    description: "One of the first users to join!",
  },
  [UserBadgeType.WARRIOR]: {
    icon: rankingBadge2,
    description: "Unlocked for achieving over 5 milestones.",
  },
};



export const getBadgeIcon = (
  badges: UserBadgeType[]
): { badge: UserBadgeType; icon: string; description: string }[] => {
  const icons: { badge: UserBadgeType; icon: string; description: string }[] =
    [];

  for (const badge of badges) {
    const badgeData = BADGE_ICONS[badge];

    if (badgeData !== undefined) {
      icons.push({
        badge,
        icon: badgeData.icon,
        description: badgeData.description,
      });
    }
  }

  return icons;
};
