import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DiscordProfile, UpdateUserDto } from './dto/users.dto';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import {
  UserAchievementsTable,
  UserDiscordConnections,
  UsersMetricsTable,
  UsersTable,
  UserStatsSessionsTable,
  UserStatsWeightLiftTable,
} from 'src/db/schema/users';
import { asc, eq } from 'drizzle-orm';
import { DetailedUserModel, UserModel, UserStatsModel } from './user.types';
import { UserService } from 'src/spi/user/user';
import {
  UserAchievementStatus,
  UserAchievementType,
} from 'src/achievements/types';
import { User } from './user.model';
import { getAchievementStatusForProgress } from 'src/achievements/utils';
import { UserBadgeType } from 'src/badges/badges';
@Injectable()
export class UsersService implements UserService {
  constructor(private readonly drizzleService: DrizzleService) {}

  public createUser = async (profile: DiscordProfile): Promise<UserModel> => {
    // it returns array so we put our new user in array to pass it later like newUser.id
    // instead of newUser[0].id

    const [newUser] = await this.drizzleService.db
      .insert(UsersTable)
      .values({
        username: profile.username,
        role: profile.username === 'twojastara123' ? 'Admin' : 'User',
      })
      .returning();
    await this.drizzleService.db.insert(UserDiscordConnections).values({
      userId: newUser.id,
      discordId: profile.id,
      avatar: profile.avatar,
      username: profile.username,
    });

    await this.drizzleService.db.insert(UsersMetricsTable).values({
      userId: newUser.id,
      height: '',
      weight: '',
      badges: [],
    });

    return newUser;
  };

  public findUserByDiscordId = async (
    discordId: string,
  ): Promise<UserModel | undefined> => {
    const result = await this.drizzleService.db
      .select({
        user: UsersTable,
        discordConnection: UserDiscordConnections,
      })
      .from(UserDiscordConnections)
      .innerJoin(UsersTable, eq(UserDiscordConnections.userId, UsersTable.id))
      .where(eq(UserDiscordConnections.discordId, discordId));

    if (result.length > 0) {
      const user = result[0].user as UserModel;
      return user as UserModel;
    }
    return undefined;
  };

  private findUserModelBaseById = async (
    userId: number,
  ): Promise<UserModel> => {
    const [user] = await this.drizzleService.db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.id, userId));

    return user;
  };

  public updateUserMetricsAndOptionalUsername = async (
    userId: number,
    dto: UpdateUserDto,
  ): Promise<DetailedUserModel> => {
    const [user] = await this.drizzleService.db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.id, userId));

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const userMetrics: Partial<Record<'height' | 'weight', string>> = {
      height: '',
      weight: '',
    };

    if (dto.height) userMetrics.height = dto.height;
    if (dto.weight) userMetrics.weight = dto.weight;
    if (Object.keys(userMetrics).length > 0) {
      await this.drizzleService.db.transaction(async (tx) => {
        await tx
          .update(UsersMetricsTable)
          .set(userMetrics)
          .where(eq(UsersMetricsTable.userId, userId));
      });
    }

    if (dto.displayName) {
      await this.updateDisplayName(userId, dto.displayName);
    }

    await this.drizzleService.db
      .update(UsersTable)
      .set({ isUserFirstTimeLoggedIn: false })
      .where(eq(UsersTable.id, userId));

    const detailedUserModel = await this.getDetailedUserModelFor(userId);

    return detailedUserModel;
  };

  private getUserAchievements = async (userId: number) => {
    const achievements = await this.drizzleService.db
      .select()
      .from(UserAchievementsTable)
      .where(eq(UserAchievementsTable.userId, userId));
    const achievementMap: Record<string, UserAchievementStatus> = {};

    achievements.forEach((a) => {
      achievementMap[a.achievementId] = {
        unlocked: a.isUnlocked,
        progress: a.progress,
      };
    });
    return achievementMap;
  };

  private getUserMetrics = async (userId: number) => {
    const [metrics] = await this.drizzleService.db
      .select()
      .from(UsersMetricsTable)
      .where(eq(UsersMetricsTable.userId, userId));
    return metrics;
  };

  private getUserDiscordConnection = async (userId: number) => {
    const [model] = await this.drizzleService.db
      .select()
      .from(UserDiscordConnections)
      .where(eq(UserDiscordConnections.userId, userId));
    return model;
  };

  public getDetailedUserModelFor = async (
    userId: number,
  ): Promise<DetailedUserModel> => {
    const userModelBase = await this.findUserModelBaseById(userId);
    const userMetrics = await this.getUserMetrics(userId);
    const stats = await this.getUserStatsFor(userId);
    const discordConnection = await this.getUserDiscordConnection(userId);
    return User.from(userModelBase, userMetrics, discordConnection, stats)
      .detailedUserModel;
  };

  private isAchievementUnlockable = (
    model: DetailedUserModel,
    type: string,
  ): type is UserAchievementType => {
    if (UserAchievementType[type as UserAchievementType] === undefined) {
      return false;
    }
    return (
      model.stats.achievements[type] === undefined ||
      !model.stats.achievements[type].unlocked
    );
  };

  public updateUserModelAchievements = (
    model: DetailedUserModel,
    achievements: Record<string, number>,
  ) => {
    const newModel = JSON.parse(JSON.stringify(model)) as DetailedUserModel;

    for (const [type, progress] of Object.entries(achievements)) {
      if (this.isAchievementUnlockable(model, type)) {
        const status = getAchievementStatusForProgress(type, progress);
        newModel.stats.achievements[type] = status;
      }
    }

    return newModel;
  };
  private getUserStatsFor = async (userId: number) => {
    const [weightLiftStats, sessionsStats, achievements] = await Promise.all([
      this.getUserStatsWeightLiftFor(userId),
      this.getUserStatsSessionsFor(userId),
      this.getUserAchievements(userId),
    ]);
    const stats: UserStatsModel = {
      userId: userId,
      maxWeight: weightLiftStats.maxWeight,
      totalSessions: sessionsStats.totalSessions,

      totalTrainingTime: sessionsStats.totalTrainingTime,
      totalWeight: weightLiftStats.totalWeight,
      achievements: achievements,
    };

    return stats;
  };

  private getUserStatsWeightLiftFor = async (userId: number) => {
    const [stats] = await this.drizzleService.db
      .select({
        totalWeight: UserStatsWeightLiftTable.totalWeight,
        maxWeight: UserStatsWeightLiftTable.maxWeight,
      })
      .from(UserStatsWeightLiftTable)
      .where(eq(UserStatsWeightLiftTable.userId, userId));
    return stats ?? { totalWeight: 0, maxWeight: 0 };
  };
  private getUserStatsSessionsFor = async (userId: number) => {
    const [stats] = await this.drizzleService.db
      .select({
        totalSessions: UserStatsSessionsTable.totalSessions,
        totalTrainingTime: UserStatsSessionsTable.totalTrainingTime,
      })
      .from(UserStatsSessionsTable)
      .where(eq(UserStatsSessionsTable.userId, userId));
    return (
      stats ?? {
        totalSessions: 0,
        totalTrainingTime: 0,
      }
    );
  };

  public getLeaderboardInfo = async () => {
    const users = await this.drizzleService.db.select().from(UsersTable);

    const detailedUsers: DetailedUserModel[] = await Promise.all(
      users.map(async (user) => await this.getDetailedUserModelFor(user.id)),
    );
    return detailedUsers;
  };

  public findUsersByCreatedAtAsc = async (
    limit: number,
  ): Promise<{ username: string }[]> => {
    return await this.drizzleService.db
      .select({ username: UsersTable.username })
      .from(UsersTable)
      .orderBy(asc(UsersTable.createdAt))
      .limit(limit);
  };

  public getAll = async (): Promise<UserModel[]> => {
    return await this.drizzleService.db.select().from(UsersTable);
  };

  public updateBadges = async (
    badges: UserBadgeType[],
    userId: number,
  ): Promise<void> => {
    await this.drizzleService.db
      .insert(UsersMetricsTable)
      .values({ badges, userId })
      .onConflictDoUpdate({
        target: UsersMetricsTable.userId,
        set: { badges },
      });
  };

  public updateDisplayName = async (userId: number, displayName: string) => {
    const userWithThisName = await this.drizzleService.db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.displayName, displayName))[0];

    if (userWithThisName) {
      throw new HttpException(
        'This display name is already being used!',
        HttpStatus.CONFLICT,
      );
    }

    await this.drizzleService.db
      .update(UsersTable)
      .set({ displayName: displayName })
      .where(eq(UsersTable.id, userId));
  };
}
