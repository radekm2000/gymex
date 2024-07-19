import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from 'src/spi/workout/workout';
import { WorkoutsService } from './workout.service';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { WorkoutSessionsService } from 'src/workout-sessions/workout-sessions.service';

@Module({
  controllers: [WorkoutController],
  imports: [DrizzleModule],
  providers: [
    {
      provide: WorkoutService,
      inject: [DrizzleService, WorkoutSessionsService],
      useFactory: (
        drizzle: DrizzleService,
        workoutSessionsService: WorkoutSessionsService,
      ): WorkoutService => {
        return new WorkoutsService(drizzle, workoutSessionsService);
      },
    },
    WorkoutSessionsService,
  ],
  exports: [WorkoutService],
})
export class WorkoutModule {}
