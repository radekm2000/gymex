import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenPayload } from './tokens';
import { jwtConstants } from './constants/constants';
import 'dotenv/config';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import {
  UserDiscordConnections,
  UsersMetricsTable,
  UsersTable,
} from 'src/db/schema/users';
import { eq } from 'drizzle-orm';
import { DiscordProfile } from 'src/users/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly drizzleService: DrizzleService,
  ) {}

  public generateRefreshTokenFor = async (userId: number): Promise<string> => {
    const payload: RefreshTokenPayload = {
      sub: userId,
    };
    return await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
      expiresIn: process.env.JWT_RT_LIFETIME,
    });
  };

  public createOrGetUser = async (profile: DiscordProfile) => {
    const result = await this.drizzleService.db
      .select({
        user: UsersTable,
        discordConnection: UserDiscordConnections,
      })
      .from(UserDiscordConnections)
      .innerJoin(UsersTable, eq(UserDiscordConnections.userId, UsersTable.id))
      .where(eq(UserDiscordConnections.discordId, profile.id));

    console.log(result);
    if (result.length > 0) {
      const user = result[0].user;
      return user;
    }

    const newUser = await this.createUser(profile);
    return newUser;
  };

  private createUser = async (profile: DiscordProfile) => {
    const newUser = await this.drizzleService.db
      .insert(UsersTable)
      .values({
        username: profile.username,
      })
      .returning();

    await this.drizzleService.db.insert(UserDiscordConnections).values({
      userId: newUser[0].id,
      discordId: profile.id,
      avatar: profile.avatar,
      username: profile.username,
    });

    await this.drizzleService.db.insert(UsersMetricsTable).values({
      userId: newUser[0].id,
      height: '',
      weight: '',
    });

    return newUser;
  };
}
