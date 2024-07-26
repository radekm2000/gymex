import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from 'src/spi/workout/workout';
import { WorkoutsService } from './workout.service';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { WorkoutSessionsService } from 'src/workout-sessions/workout-sessions.service';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { AchievementsModule } from 'src/achievements/achievements.module';
import { ExerciseService } from 'src/spi/exercise/exercise';
import { ExercisesModule } from 'src/exercises/exercises.module';

@Module({
  controllers: [WorkoutController],
  imports: [
    DrizzleModule,
    EventEmitterModule,
    AchievementsModule,
    ExercisesModule,
  ],
  providers: [
    {
      provide: WorkoutService,
      inject: [
        DrizzleService,
        WorkoutSessionsService,
        EventEmitter2,
        ExerciseService,
      ],
      useFactory: (
        drizzle: DrizzleService,
        workoutSessionsService: WorkoutSessionsService,
        eventEmitter: EventEmitter2,
        exerciseService: ExerciseService,
      ): WorkoutService => {
        return new WorkoutsService(
          drizzle,
          workoutSessionsService,
          eventEmitter,
          exerciseService,
        );
      },
    },
    WorkoutSessionsService,
  ],
  exports: [WorkoutService],
})
export class WorkoutModule {}
