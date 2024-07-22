import { UserAchievementType } from '@gymex/commons/src/achievements/types';
import { Injectable, Logger } from '@nestjs/common';
import { UserAchievementsTable } from 'src/db/schema/users';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { UsersService } from 'src/users/users.service';

type AchievementsInsert = typeof UserAchievementsTable.$inferInsert;

@Injectable()
export class AchievementsService {
  private readonly logger: Logger;

  constructor(
    private readonly drizzle: DrizzleService,
    private readonly usersService: UsersService,
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
    userId: number,
    progress: Partial<Record<UserAchievementType, number>>,
  ) => {
    const detailedUserModel =
      await this.usersService.getDetailedUserModelFor(userId);

    const updated = this.usersService.updateUserModelAchievements(
      detailedUserModel,
      progress,
    );

    for (const achievementId of Object.keys(progress)) {
      await this.upsert({
        achievementId: Number(achievementId),
        userId: userId,
        isUnlocked: updated.stats.achievements[achievementId].unlocked,
        progress: updated.stats.achievements[achievementId].progress,
      });
    }
  };
}
