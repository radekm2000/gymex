import { Injectable, Logger } from '@nestjs/common';
import { UserAchievementsTable } from 'src/db/schema/users';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { DetailedUserModel } from 'src/users/user.types';
import { UserAchievementType } from './types';
import { UserService } from 'src/spi/user/user';

type AchievementsInsert = typeof UserAchievementsTable.$inferInsert;

@Injectable()
export class AchievementsService {
  private readonly logger: Logger;

  constructor(
    private readonly drizzle: DrizzleService,
    private readonly usersService: UserService,
  ) {
    this.logger = new Logger(AchievementsService.name);
  }

  private upsert = async (value: AchievementsInsert) => {
    await this.drizzle.db
      .insert(UserAchievementsTable)
      .values(value)
      .onConflictDoUpdate({
        target: [
          UserAchievementsTable.userId,
          UserAchievementsTable.achievementId,
        ],
        set: value,
      })
      .returning();
  };

  public updateAchievementsFor = async (
    detailedUserModel: DetailedUserModel,
    progress: Partial<Record<UserAchievementType, number>>,
  ) => {
    const updated = this.usersService.updateUserModelAchievements(
      detailedUserModel,
      progress,
    );

    for (const achievementId of Object.keys(progress)) {
      await this.upsert({
        achievementId: achievementId,
        userId: detailedUserModel.user.id,
        isUnlocked: updated.stats.achievements[achievementId].unlocked,
        progress: updated.stats.achievements[achievementId].progress,
      });
    }
  };
}
