import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WorkoutService } from 'src/spi/workout/workout';
import { CreateWorkoutWithExercisesDto } from './dto/workout.dto';
import {
  DetailedWorkoutModel,
  ExerciseModel,
  WorkoutExerciseSetsModel,
} from './types/workout.types';
import { and, desc, eq } from 'drizzle-orm';

import { DrizzleService } from 'src/drizzle/drizzle.service';
import {
  ExercisesTable,
  WorkoutExerciseSetsTable,
  WorkoutExercisesTable,
  WorkoutPlansTable,
  WorkoutSessionsTable,
} from 'src/db/schema/workout';
import { Workout } from './model/workout.model';
import { AddExerciseToWorkoutDto } from 'src/exercises/dto/exercises.dto';

@Injectable()
export class WorkoutsService implements WorkoutService {
  constructor(private readonly drizzleService: DrizzleService) {}

  public createWorkoutWithExercises = async (
    dto: CreateWorkoutWithExercisesDto,
    userId: number,
  ): Promise<DetailedWorkoutModel> => {
    return await this.drizzleService.db.transaction(async (tx) => {
      const [workoutPlan] = await tx
        .insert(WorkoutPlansTable)
        .values({
          name: dto.workoutName,
          creatorId: userId,
        })
        .returning();

      const exercises: ExerciseModel[] = [];
      const allExerciseSets: WorkoutExerciseSetsModel[] = [];

      for (const exercise of dto.exercises) {
        const [workoutExercise] = await tx
          .insert(WorkoutExercisesTable)
          .values({
            workoutPlanId: workoutPlan.id,
            exerciseId: exercise.id,
            orderIndex: exercise.orderIndex,
          })
          .returning();

        const [fullExercise] = await tx
          .select()
          .from(ExercisesTable)
          .where(eq(ExercisesTable.id, exercise.id));

        exercises.push(fullExercise);

        const exerciseSets = await tx
          .insert(WorkoutExerciseSetsTable)
          .values(
            exercise.sets.map((set) => ({
              workoutPlanId: workoutPlan.id,
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

      return Workout.from(workoutPlan, exercises, allExerciseSets)
        .detailedWorkoutModel;
    });
  };

  public addExercisesToWorkout = async (
    workoutPlanId: number,
    userId: number,
    dto: AddExerciseToWorkoutDto,
  ): Promise<DetailedWorkoutModel> => {
    const [workoutPlan] = await this.drizzleService.db
      .select()
      .from(WorkoutPlansTable)
      .where(eq(WorkoutPlansTable.id, workoutPlanId));

    if (!workoutPlan) {
      throw new HttpException('Workout plan not found', HttpStatus.NOT_FOUND);
    }

    return await this.drizzleService.db.transaction(async (tx) => {
      const [workoutExercise] = await tx
        .insert(WorkoutExercisesTable)
        .values({
          exerciseId: dto.id,
          orderIndex: dto.orderIndex,
          workoutPlanId: workoutPlan.id,
        })
        .returning();
      const exerciseSets = await tx
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
          })),
        )
        .returning();

      const [fullExercise] = await tx
        .select()
        .from(ExercisesTable)
        .where(eq(ExercisesTable.id, workoutExercise.exerciseId));
      return Workout.from(workoutPlan, [fullExercise], exerciseSets)
        .detailedWorkoutModel;
    });
  };

  public startWorkout = async (workoutPlanId: number, userId: number) => {
    await this.drizzleService.db.insert(WorkoutSessionsTable).values({
      userId: userId,
      workoutPlanId: workoutPlanId,
      startedAt: new Date(),
    });

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
    return this.getDetailedWorkoutModelByWorkoutPlanId(
      workoutPlanId,
      previousWorkoutSession.id,
    );
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
        const [exerciseSets] = await tx
          .select()
          .from(WorkoutExerciseSetsTable)
          .where(
            and(
              eq(WorkoutExerciseSetsTable.workoutExerciseId, exercise.id),
              eq(WorkoutExerciseSetsTable.workoutPlanId, workout.id),
              eq(WorkoutExerciseSetsTable.workoutSessionId, workoutSessionId),
            ),
          );
        return exerciseSets;
      });
      const fullExerciseSets = await Promise.all(exerciseSetsPromise);

      return Workout.from(workout, fullExercises, fullExerciseSets)
        .detailedWorkoutModel;
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

    const workoutDuration =
      updatedSession.finishedAt.getTime() - updatedSession.startedAt.getTime();

    const detailedWorkoutModel = await this.drizzleService.db.transaction(
      async (tx) => {
        const [workoutPlan] = await tx
          .select()
          .from(WorkoutPlansTable)
          .where(eq(WorkoutPlansTable.id, workoutPlanId));
        const exercises: ExerciseModel[] = [];
        const allExerciseSets: WorkoutExerciseSetsModel[] = [];

        for (const exercise of dto.exercises) {
          const [workoutExercise] = await tx
            .insert(WorkoutExercisesTable)
            .values({
              workoutPlanId: workoutPlanId,
              exerciseId: exercise.id,
              orderIndex: exercise.orderIndex,
            })
            .returning();

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

        return Workout.from(workoutPlan, exercises, allExerciseSets)
          .detailedWorkoutModel;
      },
    );
    return { detailedWorkoutModel, workoutDuration };
  };
}
