import { UserBadgeType } from "@gymex/commons/src";
import dumbellBadge2 from "../assets/db-badge2.png";
import rankingBadge from "../assets/ranking-badge.png";
import rankingBadge2 from "../assets/ranking-badge-2.png";

export const BADGE_ICONS = {
  [UserBadgeType.ELITE]: dumbellBadge2,
  [UserBadgeType.NOVICE]: rankingBadge,
  [UserBadgeType.OG]: rankingBadge2,
  [UserBadgeType.WARRIOR]: rankingBadge2,
};

export const getBadgeIcon = (
  badges: UserBadgeType[]
): Record<UserBadgeType, string>[] => {
  const icons: Record<string, string>[] = [];

  for (const badge of badges) {
    const icon = BADGE_ICONS[badge];

    if (icon !== undefined) {
      icons.push({
        [badge]: icon,
      });
    }
  }

  return icons;
};
