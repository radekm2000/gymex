import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WorkoutModule } from './workouts/workout.module';
import { ExercisesModule } from './exercises/exercises.module';

@Module({
  imports: [DrizzleModule, ConfigModule.forRoot(), UsersModule, AuthModule, WorkoutModule, ExercisesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
