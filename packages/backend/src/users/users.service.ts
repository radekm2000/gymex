import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DiscordProfile, UpdateUserDto } from './dto/users.dto';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import {
  UserDiscordConnections,
  UsersMetricsTable,
  UsersTable,
} from 'src/db/schema/users';
import { eq } from 'drizzle-orm';
import { UserModel } from './user.types';
import { User } from './user.model';
import { UserService } from 'src/spi/user/user';

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
        role: 'User',
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

  public findUserById = async (userId: number): Promise<UserModel> => {
    const [user] = await this.drizzleService.db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.id, userId));

    return user;
  };

  public getDetailedUserInfo = async (userId: number) => {
    const user = await this.findUserById(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const [discordConnection] = await this.drizzleService.db
      .select()
      .from(UserDiscordConnections)
      .where(eq(UserDiscordConnections.userId, userId));

    const [metrics] = await this.drizzleService.db
      .select()
      .from(UsersMetricsTable)
      .where(eq(UsersMetricsTable.userId, userId));

    return User.from(user, metrics, discordConnection).detailedUserModel;
  };

  public updateUserMetricsAndOptionalUsername = async (
    userId: number,
    dto: UpdateUserDto,
  ): Promise<void> => {
    const [user] = await this.drizzleService.db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.id, userId));

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.drizzleService.db
      .update(UsersMetricsTable)
      .set({
        height: dto.height,
        weight: dto.weight,
      })
      .where(eq(UsersMetricsTable.userId, userId));

    await this.drizzleService.db.transaction(async (tx) => {
      await tx
        .update(UsersMetricsTable)
        .set({
          height: dto.height,
          weight: dto.weight,
        })
        .where(eq(UsersMetricsTable.userId, userId));

      //set username if one is given, otherwise use discord username as primary username
      if (dto.username) {
        await tx
          .update(UsersTable)
          .set({
            username: dto.username,
          })
          .where(eq(UsersTable.id, userId));
      }
    });
  };
}
