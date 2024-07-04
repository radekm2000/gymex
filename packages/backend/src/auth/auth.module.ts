import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DiscordStrategy } from './utils/DiscordStrategy';
import { jwtConstants } from './constants/constants';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    DrizzleModule,
  ],
  providers: [AuthService, JwtService, DiscordStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
