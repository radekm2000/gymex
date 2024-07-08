import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from 'src/spi/workout/workout';
import { WorkoutsService } from './workout.service';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [WorkoutController],
  imports: [DrizzleModule],
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
