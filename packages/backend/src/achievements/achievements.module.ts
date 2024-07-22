import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [
    {
      provide: AchievementsService,
      inject: [DrizzleService],
      useFactory: (drizzle: DrizzleService): AchievementsService => {
        return new AchievementsService(drizzle);
      },
    },
  ],
  controllers: [AchievementsController],
  exports: [AchievementsService],
})
export class AchievementsModule {}
