/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserBadgeType } from 'src/badges/badges';
import { UserService } from 'src/spi/user/user';
import { DetailedUserModel } from 'src/users/user.types';

type BadgeSync = {
  type: UserBadgeType;
  predicate: (
    userModel: DetailedUserModel,
    usersService: UserService,
  ) => Promise<boolean>;
};

const BADGES_SYNC: Record<UserBadgeType, BadgeSync> = {
  [UserBadgeType.OG]: {
    type: UserBadgeType.OG,
    predicate: async (userModel, usersService) => {
      const users = await usersService.findUsersByCreatedAtAsc(3);
      return users.some((user) => user.username === userModel.user.username);
    },
  },
  [UserBadgeType.ELITE]: {
    type: UserBadgeType.ELITE,
    predicate: async (userModel, usersService) => {
      return (
        Object.values(userModel.stats.achievements).filter((a) => a.unlocked)
          .length > 3
      );
    },
  },
  [UserBadgeType.NOVICE]: {
    type: UserBadgeType.NOVICE,
    predicate: async (userModel, usersService) => {
      return (
        Object.values(userModel.stats.achievements).filter((a) => a.unlocked)
          .length > 1
      );
    },
  },
  [UserBadgeType.WARRIOR]: {
    type: UserBadgeType.WARRIOR,
    predicate: async (userModel, usersService) => {
      return (
        Object.values(userModel.stats.achievements).filter((a) => a.unlocked)
          .length > 5
      );
    },
  },
};

export class BadgeSyncHandler {
  public readonly name = BadgeSyncHandler.name;
  private readonly _logger = new Logger(this.name);

  constructor(private readonly usersService: UserService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  public async syncBadges() {
    this._logger.log('Synchronizing badges');
    const users = await this.usersService.getAll();

    for (const user of users) {
      const detailedUserModel = await this.usersService.getDetailedUserModelFor(
        user.id,
      );
      const results = await Promise.all(
        Object.values(BADGES_SYNC).map(async ({ predicate, type }) => {
          const applies = await predicate(detailedUserModel, this.usersService);
          return applies ? type : undefined;
        }),
      );
      const badges = results.filter((value) => value !== undefined);

      await this.usersService.updateBadges(badges, user.id);
    }
  }
}
