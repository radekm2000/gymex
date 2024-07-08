import { Injectable } from '@nestjs/common';
import { WorkoutService } from 'src/spi/workout/workout';
import { CreateWorkoutDto } from './dto/workout.dto';
import { WorkoutModel } from './types/workout.types';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { WorkoutPlansTable } from 'src/db/schema/workout';

@Injectable()
export class WorkoutsService implements WorkoutService {
  constructor(private readonly drizzleService: DrizzleService) {}

  public createWorkout = async (
    dto: CreateWorkoutDto,
    userId: number,
  ): Promise<WorkoutModel> => {
    const [newWorkout] = await this.drizzleService.db
      .insert(WorkoutPlansTable)
      .values({
        name: dto.name,
        creatorId: userId,
      })
      .returning();

    return newWorkout;
  };

  public addExercisesToWorkout = async () => {
    return;
  };
}
