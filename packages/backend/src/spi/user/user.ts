import { DiscordProfile } from 'src/users/dto/users.dto';
import { DetailedUserModel, UserModel } from 'src/users/user.types';

export const SomeUserService = Symbol('UserService');

export interface UserService {
  createUser(profile: DiscordProfile): Promise<UserModel>;
  findUserByDiscordId(discordId: string): Promise<UserModel | undefined>;
  getDetailedUserInfo(userId: number): Promise<DetailedUserModel>;
}
