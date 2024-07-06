import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from 'src/spi/workout/workout';
import { WorkoutsService } from './workout.service';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Module({
  controllers: [WorkoutController],
  providers: [
    {
      provide: WorkoutService,
      inject: [DrizzleService],
      useFactory: (drizzle: DrizzleService): WorkoutService => {
        return new WorkoutsService(drizzle);
      },
    },
  ],
  exports: [WorkoutService],
})
export class WorkoutModule {}
