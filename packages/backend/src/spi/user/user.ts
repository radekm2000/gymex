import { UserBadgeType } from 'src/badges/badges';
import { DiscordProfile, UpdateUserDto } from 'src/users/dto/users.dto';
import { DetailedUserModel, UserModel } from 'src/users/user.types';

export const UserService = Symbol('UserService');

export interface UserService {
  createUser(profile: DiscordProfile): Promise<UserModel>;
  findUserByDiscordId(discordId: string): Promise<UserModel | undefined>;
  getDetailedUserModelFor(userId: number): Promise<DetailedUserModel>;
  updateUserMetricsAndOptionalUsername(
    userId: number,
    dto: UpdateUserDto,
  ): Promise<DetailedUserModel>;

  updateUserModelAchievements(
    model: DetailedUserModel,
    achievements: Record<string, number>,
  ): DetailedUserModel;

  getLeaderboardInfo(): Promise<DetailedUserModel[]>;
  findUsersByCreatedAtAsc(limit: number): Promise<{ username: string }[]>;
  getAll(): Promise<UserModel[]>;
  updateBadges(badges: UserBadgeType[], userId: number): Promise<void>;
  updateDisplayName(userId: number, displayName: string): Promise<void>;
}
