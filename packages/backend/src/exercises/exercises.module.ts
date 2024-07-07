import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExerciseService } from 'src/spi/exercise/exercise';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { ExercisesService } from './exercises.service';

@Module({
  controllers: [ExercisesController],
  providers: [
    {
      provide: ExerciseService,
      inject: [DrizzleService],
      useFactory: (drizzle: DrizzleService): ExerciseService => {
        return new ExercisesService(drizzle);
      },
    },
  ],
  exports: [ExerciseService],
})
export class ExercisesModule {}
