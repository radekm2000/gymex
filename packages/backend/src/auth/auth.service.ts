import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenPayload } from './tokens';
import { jwtConstants } from './constants/constants';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public generateRefreshTokenFor = async (userId: number): Promise<string> => {
    const payload: RefreshTokenPayload = {
      sub: userId,
    };
    return await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
      expiresIn: process.env.JWT_RT_LIFETIME,
    });
  };

  public createOrGetUser = () => {
    return;
  };
}
