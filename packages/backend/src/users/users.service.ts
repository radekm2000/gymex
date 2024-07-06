import { Injectable } from '@nestjs/common';
import { DiscordProfile } from './dto/users.dto';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import {
  UserDiscordConnections,
  UsersMetricsTable,
  UsersTable,
} from 'src/db/schema/users';
import { eq } from 'drizzle-orm';
import { UserModel } from './model';

@Injectable()
export class UsersService {
  constructor(private readonly drizzleService: DrizzleService) {}

  public createUser = async (profile: DiscordProfile): Promise<UserModel> => {
    // it returns array so we put our new user in array to pass it later like newUser.id
    // instead of newUser[0].id

    const [newUser] = await this.drizzleService.db
      .insert(UsersTable)
      .values({
        username: profile.username,
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
}
