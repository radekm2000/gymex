import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { DiscordAuthGuard } from './utils/DiscordGuard';
import { Request, Response } from 'express';
import { UserModel } from 'src/users/user.types';
import { AuthService } from './auth.service';
import 'dotenv/config';
import { AccessTokenGuard } from './utils/AccessTokenGuard';

export const REFRESH_TOKEN_KEY = 'refreshToken';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(DiscordAuthGuard)
  @Get('discord/login')
  handleDiscordLogin() {}

  @UseGuards(DiscordAuthGuard)
  @Get('discord/redirect')
  async handleDiscordRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserModel;

    const refreshToken = await this.authService.generateRefreshTokenFor(
      user.id,
    );

    res.cookie(REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      secure: true,
      sameSite: 'none',
    });

    if (process.env.IS_DEV == 'true') {
      return res.redirect(process.env.AUTH_DEV_REDIRECT);
    } else {
      return res.redirect(process.env.AUTH_PROD_REDIRECT);
    }
  }

  @Get('refresh')
  async refresh(@Req() req: Request) {
    return await this.authService.handleRefreshToken(req);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    return res.clearCookie(REFRESH_TOKEN_KEY).sendStatus(HttpStatus.CREATED);
  }
}
