import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { and, eq, isNull } from 'drizzle-orm';
import {
  ExercisesTable,
  WorkoutExerciseSetsTable,
  WorkoutExercisesTable,
  WorkoutPlansTable,
  WorkoutSessionsTable,
} from 'src/db/schema/workout';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { Workout } from 'src/workouts/model/workout.model';
import {
  WorkoutModel,
  WorkoutSessionModel,
} from 'src/workouts/types/workout.types';

@Injectable()
export class WorkoutSessionsService {
  constructor(private readonly drizzle: DrizzleService) {}

  public getWorkoutSessionsByWorkoutPlanId = async (workoutPlanId: number) => {
    return this.drizzle.db.transaction(async (tx) => {
      const [workoutPlan] = await tx
        .select()
        .from(WorkoutPlansTable)
        .where(eq(WorkoutPlansTable.id, workoutPlanId));

      if (!workoutPlan) {
        throw new HttpException('Workout plan not found', HttpStatus.NOT_FOUND);
      }

      const workoutSessions = await tx
        .select()
        .from(WorkoutSessionsTable)
        .where(eq(WorkoutSessionsTable.workoutPlanId, workoutPlanId));

      if (workoutSessions.length < 1) {
        return [];
      }
      const detailedSessions = [];
      for (const session of workoutSessions) {
        const detailedWorkout = await this.getDetailedSessionOfWorkoutPlan(
          session,
          workoutPlan,
        );
        detailedSessions.push(detailedWorkout);
      }
      return detailedSessions;
    });
  };
  // private getDetailedSessionOfWorkoutPlan = async (
  //   workoutPlanId: number,
  //   workoutSessionId: number,
  // ) => {
  //   return await this.drizzle.db.transaction(async (tx) => {
  //     const [workout] = await tx
  //       .select()
  //       .from(WorkoutPlansTable)
  //       .where(eq(WorkoutPlansTable.id, workoutPlanId));

  //     const [workoutSession] = await tx
  //       .select()
  //       .from(WorkoutSessionsTable)
  //       .where(eq(WorkoutSessionsTable.id, workoutSessionId));

  //     const exercisesWithSetsFromPreviousSession = await tx
  //       .select({
  //         exercise: ExercisesTable,
  //       })
  //       .from(WorkoutExercisesTable)
  //       .innerJoin(
  //         WorkoutExerciseSetsTable,
  //         and(
  //           eq(
  //             WorkoutExercisesTable.exerciseId,
  //             WorkoutExerciseSetsTable.workoutExerciseId,
  //           ),
  //           eq(WorkoutExerciseSetsTable.workoutSessionId, workoutSessionId),
  //         ),
  //       )
  //       .innerJoin(
  //         ExercisesTable,
  //         eq(WorkoutExercisesTable.exerciseId, ExercisesTable.id),
  //       )
  //       .where(eq(WorkoutExercisesTable.workoutPlanId, workout.id))
  //       .groupBy(ExercisesTable.id);

  //     const exerciseSetsPromise = exercisesWithSetsFromPreviousSession.map(
  //       async (exercise) => {
  //         const exerciseSets = await tx
  //           .select()
  //           .from(WorkoutExerciseSetsTable)
  //           .where(
  //             and(
  //               eq(
  //                 WorkoutExerciseSetsTable.workoutExerciseId,
  //                 exercise.exercise.id,
  //               ),
  //               eq(WorkoutExerciseSetsTable.workoutPlanId, workout.id),
  //               eq(WorkoutExerciseSetsTable.workoutSessionId, workoutSessionId),
  //             ),
  //           );
  //         return exerciseSets;
  //       },
  //     );

  //     const fullExerciseSets = await Promise.all(exerciseSetsPromise);
  //     const flattenExerciseSets = fullExerciseSets.flat(1);

  //     return Workout.from(
  //       workout,
  //       exercisesWithSetsFromPreviousSession.map((e) => e.exercise),
  //       flattenExerciseSets,
  //       workoutSession,
  //     ).detailedWorkoutModel;
  //   });
  // };

  public getBaseWorkoutSessionsByPlanId = (workoutPlanId: number) => {
    return this.drizzle.db.transaction(async (tx) => {
      return tx
        .select()
        .from(WorkoutSessionsTable)
        .where(eq(WorkoutSessionsTable.workoutPlanId, workoutPlanId));
    });
  };

  public getDetailedSessionOfWorkoutPlan = async (
    session: WorkoutSessionModel,
    workoutPlan: WorkoutModel,
  ) => {
    const { exercises, sets } = await this.getExerciseSetsOfWorkoutSession(
      workoutPlan.id,
      session.id,
    );

    return Workout.from(workoutPlan, exercises, sets, session);
  };

  public findUnfinishedSession = async () => {
    const [unfinishedWorkoutSession] = await this.drizzle.db
      .select()
      .from(WorkoutSessionsTable)
      .where(isNull(WorkoutSessionsTable.finishedAt))
      .limit(1);
  };

  private getExerciseSetsOfWorkoutSession = async (
    workoutPlanId: number,
    workoutSessionId: number,
  ) => {
    return this.drizzle.db.transaction(async (tx) => {
      const exercisesFromSession = await tx
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
        .where(eq(WorkoutExercisesTable.workoutPlanId, workoutPlanId))
        .groupBy(ExercisesTable.id);

      const exerciseSetsPromise = exercisesFromSession.map(async (exercise) => {
        const exerciseSets = await tx
          .select()
          .from(WorkoutExerciseSetsTable)
          .where(
            and(
              eq(
                WorkoutExerciseSetsTable.workoutExerciseId,
                exercise.exercise.id,
              ),
              eq(WorkoutExerciseSetsTable.workoutPlanId, workoutPlanId),
              eq(WorkoutExerciseSetsTable.workoutSessionId, workoutSessionId),
            ),
          );
        return exerciseSets;
      });

      const fullExerciseSets = await Promise.all(exerciseSetsPromise);
      const flattenExerciseSets = fullExerciseSets.flat(1);
      const exercisesToReturn = exercisesFromSession.map((e) => e.exercise);
      return { exercises: exercisesToReturn, sets: flattenExerciseSets };
    });
  };
}
