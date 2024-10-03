import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WorkoutModule } from './workouts/workout.module';
import { ExercisesModule } from './exercises/exercises.module';
import { MusclesModule } from './muscles/muscles.module';
import { WorkoutSessionsModule } from './workout-sessions/workout-sessions.module';
import { AchievementsModule } from './achievements/achievements.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WorkoutEventsModule } from './workout-events/workout-events.module';
import { SyncModule } from './sync/sync.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    DrizzleModule,
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    UsersModule,
    AuthModule,
    WorkoutModule,
    ExercisesModule,
    MusclesModule,
    WorkoutSessionsModule,
    AchievementsModule,
    WorkoutEventsModule,
    SyncModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
