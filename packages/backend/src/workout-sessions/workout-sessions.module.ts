import { Module } from '@nestjs/common';
import { WorkoutSessionsController } from './workout-sessions.controller';
import { WorkoutSessionsService } from './workout-sessions.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { WorkoutService } from 'src/spi/workout/workout';

@Module({
  imports: [DrizzleModule],
  controllers: [WorkoutSessionsController],
  providers: [
    {
      provide: WorkoutSessionsService,
      inject: [DrizzleService],
      useFactory: (drizzle: DrizzleService) => {
        return new WorkoutSessionsService(drizzle);
      },
    },
  ],
  exports: [WorkoutSessionsService],
})
export class WorkoutSessionsModule {}
