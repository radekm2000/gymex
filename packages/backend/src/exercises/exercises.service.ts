import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { CreateExerciseDto } from './dto/exercises.dto';
import { ExerciseService } from 'src/spi/exercise/exercise';
import { ExerciseModel } from 'src/workouts/types/workout.types';
import { ExercisesTable } from 'src/db/schema/workout';
import { UserRoles } from 'src/auth/utils/RoleGuard';
import { eq } from 'drizzle-orm';

@Injectable()
export class ExercisesService implements ExerciseService {
  constructor(private readonly drizzle: DrizzleService) {}

  public create = async (
    dto: CreateExerciseDto,
    userId: number,
    role: UserRoles.Admin | UserRoles.User,
  ): Promise<ExerciseModel> => {
    const isDefault = role === UserRoles.Admin;

    const [exercise] = await this.drizzle.db
      .insert(ExercisesTable)
      .values({
        exerciseName: dto.exerciseName,
        notes: dto.notes ?? '',
        primaryMuscleTargeted: dto.muscleTargeted,
        userId: userId,
        isDefault: isDefault,
        restTime: dto.restTime,
      })
      .returning();

    return exercise;
  };

  public getAll = async (): Promise<ExerciseModel[]> => {
    return await this.drizzle.db.select().from(ExercisesTable);
  };

  public findExerciseById = async (
    exerciseId: number,
  ): Promise<ExerciseModel> => {
    const [exercise] = await this.drizzle.db
      .select()
      .from(ExercisesTable)
      .where(eq(ExercisesTable.id, exerciseId));

    if (!exercise) {
      throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
    }
    return exercise;
  };
}
