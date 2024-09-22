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
import { and, eq, ExtractTablesWithRelations } from 'drizzle-orm';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import {
  Exercise,
  ExerciseHistory,
  ExerciseOverallStats,
} from './exercise.model';
import { UserExerciseStatsTable } from 'src/db/schema/users';

export type ExerciseStatsInsert = typeof UserExerciseStatsTable.$inferInsert;

@Injectable()
export class ExercisesService implements ExerciseService {
  constructor(private readonly drizzle: DrizzleService) {}

  public create = async (
    dto: CreateExerciseDto,
    userId: number,
    role: UserRoles.Admin | UserRoles.User,
  ): Promise<ExerciseModel> => {
    const [exercise] = await this.drizzle.db
      .insert(ExercisesTable)
      .values({
        exerciseName: dto.exerciseName,
        notes: dto.notes ?? '',
        primaryMuscleTargeted: dto.muscleTargeted,
        userId: userId,
        isCreatorDeveloper: role == UserRoles.Admin,
        isDefault: dto.isDefault,
        restTime: dto.restTime,
      })
      .returning();

    return exercise;
  };

  public getAll = async (): Promise<ExerciseModel[]> => {
    return await this.drizzle.db.select().from(ExercisesTable);
  };

  public getMyExercises = async (userId: number): Promise<ExerciseModel[]> => {
    return await this.drizzle.db
      .select()
      .from(ExercisesTable)
      .where(
        and(
          eq(ExercisesTable.userId, userId),
          eq(ExercisesTable.isDefault, false),
        ),
      );
  };

  public getDefaultExercises = async (): Promise<ExerciseModel[]> => {
    return await this.drizzle.db
      .select()
      .from(ExercisesTable)
      .where(eq(ExercisesTable.isDefault, true));
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

  public deleteExerciseById = async (exerciseId: number, userId: number) => {
    const [exercise] = await this.drizzle.db
      .delete(ExercisesTable)
      .where(
        and(
          eq(ExercisesTable.userId, userId),
          eq(ExercisesTable.id, exerciseId),
        ),
      )
      .returning();
    return exercise;
  };

  public upsertExerciseStatsToDbAndUpdateModel = async (
    value: ExerciseStatsInsert,
  ) => {
    await this.drizzle.db
      .insert(UserExerciseStatsTable)
      .values(value)
      .onConflictDoNothing()
      .returning();

    this.updateExerciseStatsModel(value);
  };

  private updateExerciseStatsModel = async (value: ExerciseStatsInsert) => {
    const { history } = await this.getExerciseHistory(
      value.exerciseId,
      value.userId,
    );
    const exercise = Exercise.from(value.userId, value.exerciseId, history);

    exercise.updateStats({
      userId: value.userId,
      exerciseId: value.exerciseId,
      totalWeight: value.totalWeight,
      totalSets: value.totalSets,
      totalReps: value.totalReps,
      maxWeight: value.maxWeight,
      finishedAt: value.finishedAt,
    });
  };

  public getExerciseHistory = async (
    exerciseId: number,
    userId: number,
  ): Promise<{
    history: ExerciseHistory;
    overallStats: ExerciseOverallStats;
  }> => {
    const historyRecords = await this.drizzle.db
      .select()
      .from(UserExerciseStatsTable)
      .where(
        and(
          eq(UserExerciseStatsTable.exerciseId, exerciseId),
          eq(UserExerciseStatsTable.userId, userId),
        ),
      );

    const history = Exercise.from(userId, exerciseId, historyRecords).history;

    const overallStats = Exercise.from(
      userId,
      exerciseId,
      historyRecords,
    ).mapHistoryToOverallStats(historyRecords);

    return { history, overallStats };
  };

  public getExerciseValueForUpdate = async (
    exercise: {
      id?: number;
      notes?: string;
      orderIndex?: number;
      sets?: {
        exerciseSetNumber?: string;
        reps?: string;
        weight?: string;
        rir?: string;
        tempo?: string;
        isStaticSet?: boolean;
        holdSecs?: string;
      }[];
    },
    finishedAt: Date,
    userId: number,
  ): Promise<ExerciseStatsInsert> => {
    return {
      totalReps: exercise.sets.reduce((acc, set) => acc + Number(set.reps), 0),
      totalSets: exercise.sets.length,
      finishedAt,
      exerciseId: exercise.id,
      maxWeight: Math.max(...exercise.sets.map((set) => Number(set.weight))),
      totalWeight: exercise.sets.reduce(
        (sum, set) => sum + Number(set.weight),
        0,
      ),
      userId,
    };
  };
}
