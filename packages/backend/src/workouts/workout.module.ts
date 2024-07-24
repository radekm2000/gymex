import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from 'src/spi/workout/workout';
import { WorkoutsService } from './workout.service';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { WorkoutSessionsService } from 'src/workout-sessions/workout-sessions.service';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { WorkoutFinishedEventUpdateStatsHandler } from 'src/events/handlers/workout-finished/update-stats';
import { AchievementsModule } from 'src/achievements/achievements.module';
import { UsersModule } from 'src/users/users.module';
import { UserService } from 'src/spi/user/user';

@Module({
  controllers: [WorkoutController],
  imports: [DrizzleModule, EventEmitterModule, AchievementsModule, UsersModule],
  providers: [
    {
      provide: WorkoutService,
      inject: [
        DrizzleService,
        WorkoutSessionsService,
        EventEmitter2,
        UserService,
      ],
      useFactory: (
        drizzle: DrizzleService,
        workoutSessionsService: WorkoutSessionsService,
        eventEmitter: EventEmitter2,
      ): WorkoutService => {
        return new WorkoutsService(
          drizzle,
          workoutSessionsService,
          eventEmitter,
        );
      },
    },
    WorkoutSessionsService,
  ],
  exports: [WorkoutService],
})
export class WorkoutModule {}
