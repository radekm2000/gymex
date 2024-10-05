import { Module } from '@nestjs/common';
import { MusclesController } from './muscles.controller';
import { MusclesService } from './muscles.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Module({
  imports: [DrizzleModule],
  controllers: [MusclesController],
  providers: [
    {
      provide: MusclesService,
      inject: [DrizzleService],
      useFactory: async (drizzle: DrizzleService) => {
        const muscleService = new MusclesService(drizzle);
        await muscleService.insertMuscleByMuscleName();
        return muscleService;
      },
    },
  ],
  exports: [MusclesService],
})
export class MusclesModule {}
