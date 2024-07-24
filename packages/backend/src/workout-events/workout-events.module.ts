import { Module } from '@nestjs/common';
import { AchievementsModule } from 'src/achievements/achievements.module';
import { AchievementsService } from 'src/achievements/achievements.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { WorkoutFinishedEventUpdateStatsHandler } from 'src/events/handlers/workout-finished/update-stats';
import { UserService } from 'src/spi/user/user';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, AchievementsModule, DrizzleModule],
  providers: [
    {
      provide: WorkoutFinishedEventUpdateStatsHandler,
      inject: [DrizzleService, UserService, AchievementsService],
      useFactory: (
        drizzle: DrizzleService,
        usersService: UserService,
        achievementsService: AchievementsService,
      ) => {
        return new WorkoutFinishedEventUpdateStatsHandler(
          drizzle,
          usersService,
          achievementsService,
        );
      },
    },
  ],
  exports: [WorkoutFinishedEventUpdateStatsHandler],
})
export class WorkoutEventsModule {}
