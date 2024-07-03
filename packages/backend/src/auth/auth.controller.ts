import { Controller, Get, UseGuards } from '@nestjs/common';
import { DiscordAuthGuard } from './utils/DiscordGuard';

@Controller('auth')
export class AuthController {
  @UseGuards(DiscordAuthGuard)
  @Get('discord/login')
  handleDiscordLogin() {}

  @Get('discord/redirect')
  handleDiscordRedirect() {}
}
