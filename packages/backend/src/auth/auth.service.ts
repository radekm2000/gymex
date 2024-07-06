import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenPayload,
  IssuedTokenPayload,
  RefreshTokenPayload,
} from './tokens';
import { jwtConstants } from './constants/constants';
import 'dotenv/config';
import { DiscordProfile } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';
import { UserModel } from 'src/users/model';
import { Request } from 'express';

@Injectable()
export class AuthService {
  JWT_AT_LIFETIME = '15m';

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public handleRefreshToken = async (request: Request) => {
    const { refreshToken } = request.cookies;

    if (!refreshToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const payload: IssuedTokenPayload = await this.jwtService.verifyAsync(
      refreshToken,
      {
        secret: jwtConstants.secret,
      },
    );

    const accessToken = await this.jwtService.signAsync(
      {
        sub: payload.sub,
      },
      {
        secret: jwtConstants.secret,
        expiresIn: this.JWT_AT_LIFETIME,
      },
    );

    return accessToken;
  };

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
