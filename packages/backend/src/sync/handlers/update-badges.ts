/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserBadgeType } from 'src/badges/badges';
import { UserService } from 'src/spi/user/user';
import { User } from 'src/users/user.model';

type BadgeSync = {
  type: UserBadgeType;
  predicate: (userModel: User, usersService: UserService) => Promise<boolean>;
};

const BADGES_SYNC: Record<UserBadgeType, BadgeSync> = {
  [UserBadgeType.OG]: {
    type: UserBadgeType.OG,
    predicate: async (userModel, usersService) => {
      const users = await usersService.findUsersByCreatedAtAsc(3);
      return users.some((user) => user.username === userModel.model.username);
    },
  },
  [UserBadgeType.ELITE]: {
    type: UserBadgeType.OG,
    predicate: async (userModel, usersService) => {
      const users = await usersService.findUsersByCreatedAtAsc(3);
      return users.some((user) => user.username === userModel.model.username);
    },
  },
  [UserBadgeType.NOVICE]: {
    type: UserBadgeType.OG,
    predicate: async (userModel, usersService) => {
      const users = await usersService.findUsersByCreatedAtAsc(3);
      return users.some((user) => user.username === userModel.model.username);
    },
  },
  [UserBadgeType.WARRIOR]: {
    type: UserBadgeType.OG,
    predicate: async (userModel, usersService) => {
      const users = await usersService.findUsersByCreatedAtAsc(3);
      return users.some((user) => user.username === userModel.model.username);
    },
  },
};

export class BadgeSyncHandler {
  public readonly name = BadgeSyncHandler.name;
  private readonly _logger = new Logger(this.name);

  constructor(private readonly usersService: UserService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  public async syncBadges() {
    const users = await this.usersService.getAll();
  }
}
