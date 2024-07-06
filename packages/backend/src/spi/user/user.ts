import { DiscordProfile } from 'src/users/dto/users.dto';
import { UserModel } from 'src/users/model';

export const SomeUserService = Symbol('UserService');

export interface UserService {
  createUser(profile: DiscordProfile): Promise<UserModel>;
  findUserByDiscordId(discordId: string): Promise<UserModel | undefined>;
}
