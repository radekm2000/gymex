import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload, RefreshTokenPayload } from './tokens';
import { jwtConstants } from './constants/constants';
import 'dotenv/config';
import { DiscordProfile } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';
import { UserModel } from 'src/users/model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
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

  public generateAccessTokenFor = async (userId: number): Promise<string> => {
    const payload: AccessTokenPayload = {
      sub: userId,
    };
    return await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
      expiresIn: process.env.JWT_AT_LIFETIME,
    });
  };

  public createOrGetUser = async (
    profile: DiscordProfile,
  ): Promise<UserModel> => {
    const user = await this.usersService.findUserByDiscordId(profile.id);

    if (user) {
      return user as UserModel;
    } else {
      return await this.usersService.createUser(profile);
    }
  };
}
