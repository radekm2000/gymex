import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DrizzleSchema, DrizzleService } from 'src/drizzle/drizzle.service';
import {
  AddExerciseToWorkoutDto,
  CreateExerciseDto,
} from './dto/exercises.dto';
import { ExerciseService } from 'src/spi/exercise/exercise';
import {
  ExerciseModel,
  WorkoutExerciseSetsModel,
} from 'src/workouts/types/workout.types';
import {
  ExercisesTable,
  WorkoutExerciseSetsTable,
} from 'src/db/schema/workout';
import { UserRoles } from 'src/auth/utils/RoleGuard';
import { eq, ExtractTablesWithRelations } from 'drizzle-orm';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';

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

  public createExerciseSets = async (
    userId: number,
    workoutPlanId: number,
    exercise: AddExerciseToWorkoutDto,
    tx?: PgTransaction<
      NodePgQueryResultHKT,
      DrizzleSchema,
      ExtractTablesWithRelations<DrizzleSchema>
    >,
  ): Promise<WorkoutExerciseSetsModel[]> => {
    const db = tx ? tx : this.drizzle.db;
    return await db
      .insert(WorkoutExerciseSetsTable)
      .values(
        exercise.sets.map((set) => ({
          workoutPlanId: workoutPlanId,
          workoutExerciseId: exercise.id,
          exerciseSetNumber: set.exerciseSetNumber,
          userId: userId,
          reps: set.reps,
          weight: set.weight,
          rir: set.rir,
          tempo: set.tempo,
        })),
      )
      .returning();
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
