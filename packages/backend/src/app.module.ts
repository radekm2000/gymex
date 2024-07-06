import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WorkoutModule } from './workout/workout.module';

@Module({
  imports: [DrizzleModule, ConfigModule.forRoot(), UsersModule, AuthModule, WorkoutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
