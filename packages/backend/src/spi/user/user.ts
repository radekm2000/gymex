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
  ): Promise<void>;

  updateUserModelAchievements(
    model: DetailedUserModel,
    achievements: Record<string, number>,
  ): DetailedUserModel;
}
