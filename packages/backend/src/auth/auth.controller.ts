import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { DiscordAuthGuard } from './utils/DiscordGuard';
import { Request, Response } from 'express';
import { UserModel } from 'src/users/model';
import { AuthService } from './auth.service';
import 'dotenv/config';
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

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      secure: true,
      sameSite: 'none',
    });

    if (process.env.IS_DEV == 'true') {
      return res.redirect(process.env.AUTH_DEV_REDIRECT);
    } else {
      // nothing here yet
      return;
    }
  }
}
