import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenPayload,
  IssuedTokenPayload,
  RefreshTokenPayload,
} from './tokens';
import { jwtConstants } from './constants/constants';
import 'dotenv/config';
import { DiscordProfile } from 'src/users/dto/users.dto';
import { UserModel } from 'src/users/user.types';
import { Request } from 'express';
import { UserService } from 'src/spi/user/user';
import { UserRoles } from './utils/RoleGuard';

@Injectable()
export class AuthService {
  JWT_AT_LIFETIME = '1d';

  constructor(
    private readonly jwtService: JwtService,
    @Inject(UserService) private readonly usersService: UserService,
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
        role: payload.role,
      },
      {
        secret: jwtConstants.secret,
        expiresIn: this.JWT_AT_LIFETIME,
      },
    );

    return { accessToken };
  };

  public generateRefreshTokenFor = async (userId: number): Promise<string> => {
    const payload: RefreshTokenPayload = {
      sub: userId,
      role: UserRoles.User,
    };
    return await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
      expiresIn: process.env.JWT_RT_LIFETIME,
    });
  };

  public generateAccessTokenFor = async (userId: number): Promise<string> => {
    const payload: AccessTokenPayload = {
      sub: userId,
      role: UserRoles.User,
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
