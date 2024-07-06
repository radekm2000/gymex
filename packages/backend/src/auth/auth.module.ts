import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DiscordStrategy } from './utils/DiscordStrategy';
import { jwtConstants } from './constants/constants';
import { UsersModule } from 'src/users/users.module';
import { UserService } from 'src/spi/user/user';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    UsersModule,
  ],
  providers: [
    DiscordStrategy,
    {
      provide: AuthService,
      inject: [JwtService, UserService],
      useFactory: (jwtService: JwtService, userService: UsersService) => {
        return new AuthService(jwtService, userService);
      },
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
