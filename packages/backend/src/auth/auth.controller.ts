import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { DiscordAuthGuard } from './utils/DiscordGuard';
import { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  @UseGuards(DiscordAuthGuard)
  @Get('discord/login')
  handleDiscordLogin() {}

  @UseGuards(DiscordAuthGuard)
  @Get('discord/redirect')
  handleDiscordRedirect(@Req() req: Request, @Res() res: Response) {
    console.log(req.user);

    return res.redirect('http://localhost:5173');
  }
}
