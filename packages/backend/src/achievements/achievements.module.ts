import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { UsersModule } from 'src/users/users.module';
import { UserService } from 'src/spi/user/user';

@Module({
  imports: [DrizzleModule, UsersModule],
  providers: [
    {
      provide: AchievementsService,
      inject: [DrizzleService, UserService],
      useFactory: (
        drizzle: DrizzleService,
        usersService: UserService,
      ): AchievementsService => {
        return new AchievementsService(drizzle, usersService);
      },
    },
  ],
  controllers: [AchievementsController],
  exports: [AchievementsService],
})
export class AchievementsModule {}
