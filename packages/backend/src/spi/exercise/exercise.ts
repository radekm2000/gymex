import { ExtractTablesWithRelations } from 'drizzle-orm';
import { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { UserRoles } from 'src/auth/utils/RoleGuard';
import { DrizzleSchema } from 'src/drizzle/drizzle.service';
import {
  AddExerciseToWorkoutDto,
  CreateExerciseDto,
} from 'src/exercises/dto/exercises.dto';
import {
  ExerciseModel,
  WorkoutExerciseSetsModel,
} from 'src/workouts/types/workout.types';

export const ExerciseService = Symbol('ExerciseService');

export interface ExerciseService {
  create(
    dto: CreateExerciseDto,
    userId: number,
    role: UserRoles.Admin | UserRoles.User,
  ): Promise<ExerciseModel>;

  getAll(): Promise<ExerciseModel[]>;

  getMyExercises(userId: number): Promise<ExerciseModel[]>;

  findExerciseById(exerciseId: number): Promise<ExerciseModel>;

  createExerciseSets(
    userId: number,
    workoutPlanId: number,
    exercise: AddExerciseToWorkoutDto,
    tx?: PgTransaction<
      NodePgQueryResultHKT,
      DrizzleSchema,
      ExtractTablesWithRelations<DrizzleSchema>
    >,
  ): Promise<WorkoutExerciseSetsModel[]>;

  deleteExerciseById(
    exerciseId: number,
    userId: number,
  ): Promise<ExerciseModel>;
}
