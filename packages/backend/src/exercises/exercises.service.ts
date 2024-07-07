import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { CreateExerciseDto } from './dto/exercises.dto';
import { ExerciseService } from 'src/spi/exercise/exercise';
import { ExerciseModel } from 'src/workouts/types/workout.types';
import { ExercisesTable } from 'src/db/schema/workout';

@Injectable()
export class ExercisesService implements ExerciseService {
  constructor(private readonly drizzle: DrizzleService) {}

  public create = async (
    dto: CreateExerciseDto,
    userId: number,
  ): Promise<ExerciseModel> => {
    // if userId is inserted it means exercise is created by user otherwise it is created by developer

    const [exercise] = await this.drizzle.db
      .insert(ExercisesTable)
      .values({
        exerciseName: dto.exerciseName,
        description: dto.description ?? '',
        primaryMuscleTargeted: dto.muscleTargeted,
        isDefault: userId ? false : true,
      })
      .returning();

    return exercise;
  };
}
