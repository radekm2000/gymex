import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WorkoutService } from 'src/spi/workout/workout';
import { CreateWorkoutWithExercisesDto } from './dto/workout.dto';
import {
  DetailedWorkoutModel,
  ExerciseModel,
  WorkoutExerciseSetsModel,
} from './types/workout.types';
import { and, desc, eq, ExtractTablesWithRelations, isNull } from 'drizzle-orm';

import {
  ExercisesTable,
  WorkoutExerciseSetsTable,
  WorkoutExercisesTable,
  WorkoutPlansTable,
  WorkoutSessionsTable,
} from 'src/db/schema/workout';
import { Workout } from './model/workout.model';
import { AddExerciseToWorkoutDto } from 'src/exercises/dto/exercises.dto';
import { WorkoutSessionsService } from 'src/workout-sessions/workout-sessions.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  WorkoutEvents,
  WorkoutFinishedPayload,
} from 'src/events/constants/events';
import { ExerciseService } from 'src/spi/exercise/exercise';
import { Chart } from 'src/exercises/chart/chart.model';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import { DrizzleSchema, DrizzleService } from 'src/drizzle/drizzle.service';

// TODO assign userId  to creatorId when retrieveing workouts

@Injectable()
export class WorkoutsService implements WorkoutService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly workoutSessionsService: WorkoutSessionsService,
    private readonly eventEmitter: EventEmitter2,
    private readonly exerciseService: ExerciseService,
  ) {}

  private createWorkoutPlanBase = async (
    workoutName: string,
    userId: number,
    tx?: PgTransaction<
      NodePgQueryResultHKT,
      DrizzleSchema,
      ExtractTablesWithRelations<DrizzleSchema>
    >,
  ) => {
    const db = tx ? tx : this.drizzleService.db;
    return await db
      .insert(WorkoutPlansTable)
      .values({
        name: workoutName,
        creatorId: userId,
        createdAt: new Date(),
      })
      .returning();
  };

  private createWorkoutExercises = async (
    workoutPlanId: number,
    exerciseId: number,
    orderIndex: number,
    tx?: PgTransaction<
      NodePgQueryResultHKT,
      DrizzleSchema,
      ExtractTablesWithRelations<DrizzleSchema>
    >,
  ) => {
    const db = tx ? tx : this.drizzleService.db;
    return await db
      .insert(WorkoutExercisesTable)
      .values({
        workoutPlanId,
        exerciseId,
        orderIndex,
      })
      .returning();
  };

  public createWorkoutWithExercises = async (
    dto: CreateWorkoutWithExercisesDto,
    userId: number,
  ): Promise<DetailedWorkoutModel> => {
    return await this.drizzleService.db.transaction(async (tx) => {
      const [workoutPlan] = await this.createWorkoutPlanBase(
        dto.workoutName,
        userId,
      );

      const exercises: ExerciseModel[] = [];
      const allExerciseSets: WorkoutExerciseSetsModel[] = [];
      for (const exercise of dto.exercises) {
        await this.createWorkoutExercises(
          workoutPlan.id,
          exercise.id,
          exercise.orderIndex,
        );

        const fullExercise = await this.exerciseService.findExerciseById(
          exercise.id,
        );

        exercises.push(fullExercise);

        const exerciseSets = await this.exerciseService.createExerciseSets(
          userId,
          workoutPlan.id,
          exercise,
          tx,
        );

        allExerciseSets.push(...exerciseSets);
      }

      return Workout.from(workoutPlan, exercises, allExerciseSets)
        .detailedWorkoutModel;
    });
  };

  public addExercisesToWorkout = async (
    workoutPlanId: number,
    userId: number,
    dto: AddExerciseToWorkoutDto,
    workoutSessionId?: number,
  ): Promise<DetailedWorkoutModel> => {
    const workoutPlan = await this.getBaseWorkoutPlanById(workoutPlanId);

    await this.drizzleService.db.transaction(async (tx) => {
      const [workoutExercise] = await tx
        .insert(WorkoutExercisesTable)
        .values({
          exerciseId: dto.id,
          orderIndex: dto.orderIndex,
          workoutPlanId: workoutPlan.id,
        })
        .returning();
      await tx
        .insert(WorkoutExerciseSetsTable)
        .values(
          dto.sets.map((set) => ({
            userId: userId,
            workoutExerciseId: workoutExercise.exerciseId,
            reps: set.reps,
            tempo: set.tempo,
            rir: set.rir,
            weight: set.weight,
            exerciseSetNumber: set.exerciseSetNumber,
            workoutPlanId: workoutPlan.id,
            workoutSessionId: workoutSessionId || null,
          })),
        )
        .returning();
    });
    const workoutExercises = await this.drizzleService.db
      .select()
      .from(WorkoutExercisesTable)
      .where(eq(WorkoutExercisesTable.workoutPlanId, workoutPlan.id));

    const fullExercisesPromise = workoutExercises.map(async (exercise) => {
      const [fullExercise] = await this.drizzleService.db
        .select()
        .from(ExercisesTable)
        .where(eq(ExercisesTable.id, exercise.exerciseId));
      return fullExercise;
    });
    const fullExercises = await Promise.all(fullExercisesPromise);

    const exerciseSetsPromise = fullExercises.map(async (exercise) => {
      const exerciseSets = await this.drizzleService.db
        .select()
        .from(WorkoutExerciseSetsTable)
        .where(
          and(
            eq(WorkoutExerciseSetsTable.workoutExerciseId, exercise.id),
            eq(WorkoutExerciseSetsTable.workoutPlanId, workoutPlan.id),
            workoutSessionId
              ? eq(WorkoutExerciseSetsTable.workoutSessionId, workoutSessionId)
              : isNull(WorkoutExerciseSetsTable.workoutSessionId),
          ),
        );
      return exerciseSets;
    });

    const fullExerciseSets = await Promise.all(exerciseSetsPromise);
    const flattenExerciseSets = fullExerciseSets.flat(1);

    return Workout.from(workoutPlan, fullExercises, flattenExerciseSets)
      .detailedWorkoutModel;
  };

  public startWorkout = async (workoutPlanId: number, userId: number) => {
    await this.drizzleService.db
      .insert(WorkoutSessionsTable)
      .values({
        userId: userId,
        workoutPlanId: workoutPlanId,
        startedAt: new Date(),
      })
      .returning();
    const [previousWorkoutSession] = await this.drizzleService.db
      .select()
      .from(WorkoutSessionsTable)
      .where(
        and(
          eq(WorkoutSessionsTable.workoutPlanId, workoutPlanId),
          eq(WorkoutSessionsTable.userId, userId),
        ),
      )
      .limit(1)
      .orderBy(desc(WorkoutSessionsTable.finishedAt));
    if (!previousWorkoutSession) {
      return this.getDetailedWorkoutModelWithoutSession(workoutPlanId);
    }
    return this.getDetailedWorkoutModelByWorkoutPlanId(
      workoutPlanId,
      previousWorkoutSession.id,
    );
  };

  private getDetailedWorkoutModelWithoutSession = async (
    workoutPlanId: number,
  ) => {
    return await this.drizzleService.db.transaction(async (tx) => {
      const [workout] = await tx
        .select()
        .from(WorkoutPlansTable)
        .where(eq(WorkoutPlansTable.id, workoutPlanId));

      const workoutExercises = await tx
        .select()
        .from(WorkoutExercisesTable)
        .where(eq(WorkoutExercisesTable.workoutPlanId, workout.id));

      const fullExercisesPromise = workoutExercises.map(async (exercise) => {
        const [fullExercise] = await tx
          .select()
          .from(ExercisesTable)
          .where(eq(ExercisesTable.id, exercise.exerciseId));
        return fullExercise;
      });
      const fullExercises = await Promise.all(fullExercisesPromise);

      const exerciseSetsPromise = fullExercises.map(async (exercise) => {
        const exerciseSets = await tx
          .select()
          .from(WorkoutExerciseSetsTable)
          .where(
            and(
              eq(WorkoutExerciseSetsTable.workoutExerciseId, exercise.id),
              eq(WorkoutExerciseSetsTable.workoutPlanId, workout.id),
            ),
          );
        return exerciseSets;
      });
      const defaultReps = '10';
      const defaultWeight = '0';
      const defaultTempo = '';
      const defaultRir = '';

      const fullExerciseSets = await Promise.all(exerciseSetsPromise);
      const flattenExerciseSets = fullExerciseSets.flat(1);

      const defaultFlattenExerciseSets = flattenExerciseSets.map((set) => ({
        ...set,
        reps: defaultReps,
        tempo: defaultTempo,
        weight: defaultWeight,
        rir: defaultRir,
      }));
      return Workout.from(
        workout,
        fullExercises,
        defaultFlattenExerciseSets,
        null,
      ).detailedWorkoutModel;
    });
  };

  private getDetailedWorkoutModelByWorkoutPlanId = async (
    workoutPlanId: number,
    workoutSessionId: number,
  ) => {
    return await this.drizzleService.db.transaction(async (tx) => {
      const [workout] = await tx
        .select()
        .from(WorkoutPlansTable)
        .where(eq(WorkoutPlansTable.id, workoutPlanId));

      const [workoutSession] = await tx
        .select()
        .from(WorkoutSessionsTable)
        .where(eq(WorkoutSessionsTable.id, workoutSessionId));
      //these queries will return all exercises in workout plan including ones that were not included in previous workout session so we dont want them for now

      // const workoutExercises = await tx
      //   .select()
      //   .from(WorkoutExercisesTable)
      //   .where(eq(WorkoutExercisesTable.workoutPlanId, workout.id));

      // const fullExercisesPromise = workoutExercises.map(async (exercise) => {
      //   const [fullExercise] = await tx
      //     .select()
      //     .from(ExercisesTable)
      //     .where(eq(ExercisesTable.id, exercise.exerciseId));
      //   return fullExercise;
      // });
      // const fullExercises = await Promise.all(fullExercisesPromise);
      const exercisesWithSetsFromPreviousSession = await tx
        .select({
          exercise: ExercisesTable,
        })
        .from(WorkoutExercisesTable)
        .innerJoin(
          WorkoutExerciseSetsTable,
          and(
            eq(
              WorkoutExercisesTable.exerciseId,
              WorkoutExerciseSetsTable.workoutExerciseId,
            ),
            eq(WorkoutExerciseSetsTable.workoutSessionId, workoutSessionId),
          ),
        )
        .innerJoin(
          ExercisesTable,
          eq(WorkoutExercisesTable.exerciseId, ExercisesTable.id),
        )
        .where(eq(WorkoutExercisesTable.workoutPlanId, workout.id))
        .groupBy(ExercisesTable.id);

      const exerciseSetsPromise = exercisesWithSetsFromPreviousSession.map(
        async (exercise) => {
          const exerciseSets = await tx
            .select()
            .from(WorkoutExerciseSetsTable)
            .where(
              and(
                eq(
                  WorkoutExerciseSetsTable.workoutExerciseId,
                  exercise.exercise.id,
                ),
                eq(WorkoutExerciseSetsTable.workoutPlanId, workout.id),
                eq(WorkoutExerciseSetsTable.workoutSessionId, workoutSessionId),
              ),
            );
          return exerciseSets;
        },
      );

      const fullExerciseSets = await Promise.all(exerciseSetsPromise);
      const flattenExerciseSets = fullExerciseSets.flat(1);

      return Workout.from(
        workout,
        exercisesWithSetsFromPreviousSession.map((e) => e.exercise),
        flattenExerciseSets,
        workoutSession,
      ).detailedWorkoutModel;
    });
  };

  public finishWorkout = async (
    workoutPlanId: number,
    userId: number,
    dto: CreateWorkoutWithExercisesDto,
  ) => {
    const [sessionToFinish] = await this.drizzleService.db
      .select()
      .from(WorkoutSessionsTable)
      .where(
        and(
          eq(WorkoutSessionsTable.workoutPlanId, workoutPlanId),
          eq(WorkoutSessionsTable.userId, userId),
        ),
      )
      .limit(1)
      .orderBy(desc(WorkoutSessionsTable.startedAt));
    const [updatedSession] = await this.drizzleService.db
      .update(WorkoutSessionsTable)
      .set({
        finishedAt: new Date(),
      })
      .where(eq(WorkoutSessionsTable.id, sessionToFinish.id))
      .returning();
    return await this.drizzleService.db.transaction(async (tx) => {
      const [workoutPlan] = await tx
        .select()
        .from(WorkoutPlansTable)
        .where(eq(WorkoutPlansTable.id, workoutPlanId));
      const exercises: ExerciseModel[] = [];
      const allExerciseSets: WorkoutExerciseSetsModel[] = [];

      for (const exercise of dto.exercises) {
        let workoutExercise: {
          workoutPlanId: number;
          exerciseId: number;
          orderIndex: number;
        };

        const [existingWorkoutExercise] = await tx
          .select()
          .from(WorkoutExercisesTable)
          .where(
            and(
              eq(WorkoutExercisesTable.workoutPlanId, workoutPlanId),
              eq(WorkoutExercisesTable.exerciseId, exercise.id),
            ),
          );

        if (existingWorkoutExercise) {
          workoutExercise = existingWorkoutExercise;
        } else {
          const workoutExerciseInDb = await tx
            .insert(WorkoutExercisesTable)
            .values({
              workoutPlanId: workoutPlanId,
              exerciseId: exercise.id,
              orderIndex: exercise.orderIndex,
            })
            .returning();
          workoutExercise = workoutExerciseInDb[0];
        }

        const [fullExercise] = await tx
          .select()
          .from(ExercisesTable)
          .where(eq(ExercisesTable.id, exercise.id));

        exercises.push(fullExercise);
        const exerciseSets = await tx
          .insert(WorkoutExerciseSetsTable)
          .values(
            exercise.sets.map((set) => ({
              workoutPlanId: workoutPlanId,
              workoutSessionId: sessionToFinish.id,
              workoutExerciseId: workoutExercise.exerciseId,
              exerciseSetNumber: set.exerciseSetNumber,
              userId: userId,
              reps: set.reps,
              weight: set.weight,
              rir: set.rir,
              tempo: set.tempo,
            })),
          )
          .returning();

        allExerciseSets.push(...exerciseSets);
      }

      const workout = Workout.from(
        workoutPlan,
        exercises,
        allExerciseSets,
        updatedSession,
      );
      const payload: WorkoutFinishedPayload = {
        userId: userId,
        totalWeight: workout.workoutSummary.totalWeight,
        totalTrainingTimeInSecs:
          workout.workoutSummary.totalTrainingTimeInSeconds,
        sessionAmount: 1,
        maxWeight: workout.workoutSummary.maxWeight,
      };

      this.eventEmitter.emit(WorkoutEvents.WorkoutFinished, payload);

      return workout.detailedWorkoutModel;
    });
  };

  public getAll = async () => {
    const workoutPlans = await this.drizzleService.db
      .select()
      .from(WorkoutPlansTable);
    const detailedWorkoutModels: DetailedWorkoutModel[] = [];
    for (const workoutPlan of workoutPlans) {
      const detailedWorkoutModel =
        await this.getDetailedWorkoutModelWithoutSession(workoutPlan.id);
      detailedWorkoutModels.push(detailedWorkoutModel);
    }

    return detailedWorkoutModels;
  };

  private getBaseWorkoutPlanById = async (workoutPlanId: number) => {
    const [workoutPlan] = await this.drizzleService.db
      .select()
      .from(WorkoutPlansTable)
      .where(eq(WorkoutPlansTable.id, workoutPlanId));

    if (!workoutPlan) {
      throw new HttpException('Workout plan not found', HttpStatus.NOT_FOUND);
    }

    return workoutPlan;
  };

  public getSessionsByWorkoutPlan = async (workoutPlanId: number) => {
    const workoutPlan = await this.getBaseWorkoutPlanById(workoutPlanId);
    const workoutBaseSesssions =
      await this.workoutSessionsService.getBaseWorkoutSessionsByPlanId(
        workoutPlan.id,
      );
    const detailedSessions = await Promise.all(
      workoutBaseSesssions.map(
        async (session) =>
          await this.workoutSessionsService.getDetailedSessionOfWorkoutPlan(
            session,
            workoutPlan,
          ),
      ),
    );
    return detailedSessions;
  };

  public getChartModel = async (exerciseId: number, workoutPlanId?: number) => {
    const exercise = await this.exerciseService.findExerciseById(exerciseId);

    const workoutModels: Workout[] = [];

    if (workoutPlanId) {
      const models = await this.getSessionsByWorkoutPlan(workoutPlanId);
      workoutModels.push(...models);
    } else {
      const allWorkouts = await this.getAll();
      const baseWorkouts = allWorkouts.map((w) => w.workout);
      const models = await Promise.all(
        baseWorkouts.map(
          async (w) => await this.getSessionsByWorkoutPlan(w.id),
        ),
      );
      const flattenModels = models.flat();
      workoutModels.push(...flattenModels);
    }
    return Chart.from(exercise, workoutModels).chartData;
  };
}
