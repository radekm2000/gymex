import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { eq } from 'drizzle-orm';
import {
  UserStatsSessionsTable,
  UserStatsWeightLiftTable,
} from 'src/db/schema/users';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import {
  WorkoutEvents,
  WorkoutFinishedPayload,
} from 'src/events/constants/events';
import { WorkoutFinishedEventEventHandlerBase } from './base';
import { AchievementsService } from 'src/achievements/achievements.service';
import { UserStatsModel } from 'src/users/user.types';
import { UserService } from 'src/spi/user/user';
import { UserAchievementType } from 'src/achievements/types';

const ACHIEVEMENTS: {
  type: UserAchievementType;
  fn: (p: UserStatsModel) => number;
}[] = [
  { type: UserAchievementType.TOTAL_WEIGHT_LIFT_10T, fn: (p) => p.totalWeight },
  { type: UserAchievementType.TOTAL_WEIGHT_LIFT_25T, fn: (p) => p.totalWeight },
  { type: UserAchievementType.TOTAL_WEIGHT_LIFT_50T, fn: (p) => p.totalWeight },
  {
    type: UserAchievementType.TOTAL_WEIGHT_LIFT_100T,
    fn: (p) => p.totalWeight,
  },
  { type: UserAchievementType.TOTAL_SESSIONS_1, fn: (p) => p.totalSessions },
  { type: UserAchievementType.TOTAL_SESSIONS_10, fn: (p) => p.totalSessions },
  { type: UserAchievementType.TOTAL_SESSIONS_50, fn: (p) => p.totalSessions },
  { type: UserAchievementType.TOTAL_SESSIONS_100, fn: (p) => p.totalSessions },
  {
    type: UserAchievementType.TOTAL_TRAINING_TIME_1D,
    fn: (p) => p.totalTrainingTime,
  },
  {
    type: UserAchievementType.MAX_WEIGHT_50KG,
    fn: (p) => p.maxWeight,
  },
  {
    type: UserAchievementType.MAX_WEIGHT_100KG,
    fn: (p) => p.maxWeight,
  },
];

@Injectable()
export class WorkoutFinishedEventUpdateStatsHandler extends WorkoutFinishedEventEventHandlerBase {
  public readonly name = 'UpdateStats';

  constructor(
    private readonly drizzle: DrizzleService,
    private readonly usersService: UserService,
    private readonly achievementsService: AchievementsService,
  ) {
    super();
  }

  @OnEvent(WorkoutEvents.WorkoutFinished)
  public async handle(payload: WorkoutFinishedPayload) {
    const {
      userId,
      totalWeight,
      maxWeight,
      sessionAmount,
      totalTrainingTimeInSecs,
    } = payload;
    await this.handleSafely(async () => {
      await this.updateStatsWeightFor(userId, totalWeight, maxWeight);
      await this.updateStatsSessionFor(
        userId,
        sessionAmount,
        totalTrainingTimeInSecs,
      );
      const model = await this.usersService.getDetailedUserModelFor(userId);

      const achievementProgress = Object.fromEntries(
        ACHIEVEMENTS.map(({ type, fn }) => [type, fn(model.stats)]),
      );
      await this.achievementsService.updateAchievementsFor(
        model,
        achievementProgress,
      );
    });
  }

  private updateStatsWeightFor = async (
    userId: number,
    totalWeight: number,
    maxWeight: number,
  ) => {
    const [result] = await this.drizzle.db
      .select({
        maxWeight: UserStatsWeightLiftTable.maxWeight,
        totalWeight: UserStatsWeightLiftTable.totalWeight,
      })
      .from(UserStatsWeightLiftTable)
      .where(eq(UserStatsWeightLiftTable.userId, userId));

    const currentMaxWeight = result.maxWeight ?? 0;
    const currentTotalWeight = result.totalWeight ?? 0;

    const updatedTotalWeight = currentTotalWeight + totalWeight;
    const updatedMaxWeight = Math.max(currentMaxWeight, maxWeight);

    if (result) {
      await this.drizzle.db
        .update(UserStatsWeightLiftTable)
        .set({
          maxWeight: updatedMaxWeight,
          totalWeight: updatedTotalWeight,
          updatedAt: new Date(),
        })
        .where(eq(UserStatsWeightLiftTable.userId, userId));
    } else {
      await this.drizzle.db.insert(UserStatsWeightLiftTable).values({
        userId: userId,
        maxWeight: updatedMaxWeight,
        totalWeight: updatedTotalWeight,
        updatedAt: new Date(),
      });
    }
  };

  private updateStatsSessionFor = async (
    userId: number,
    sessionAmount: number = 1,
    trainingTimeInSeconds: number,
  ) => {
    const [result] = await this.drizzle.db
      .select()
      .from(UserStatsSessionsTable)
      .where(eq(UserStatsSessionsTable.userId, userId));

    if (!result) {
      await this.drizzle.db.insert(UserStatsSessionsTable).values({
        userId,
        totalSessions: sessionAmount,
        totalTrainingTime: trainingTimeInSeconds,
        updatedAt: new Date(),
      });
    } else {
      const currentTrainingTime = result.totalTrainingTime;
      const currentTotalSessions = result.totalSessions;

      const updatedTotalSessions = currentTotalSessions + sessionAmount;
      const updatedTrainingTime = currentTrainingTime + trainingTimeInSeconds;
      await this.drizzle.db.update(UserStatsSessionsTable).set({
        totalSessions: updatedTotalSessions,
        totalTrainingTime: updatedTrainingTime,
        updatedAt: new Date(),
      });
    }
  };
}
