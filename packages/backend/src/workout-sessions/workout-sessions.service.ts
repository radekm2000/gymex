import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import {
  ExercisesTable,
  WorkoutExerciseSetsTable,
  WorkoutExercisesTable,
  WorkoutPlansTable,
  WorkoutSessionsTable,
} from 'src/db/schema/workout';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { WorkoutService } from 'src/spi/workout/workout';
import { Workout } from 'src/workouts/model/workout.model';

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
        const detailedWorkout =
          await this.getDetailedWorkoutModelByWorkoutPlanId(
            workoutPlan.id,
            session.id,
          );
        detailedSessions.push(detailedWorkout);
      }
      return detailedSessions;

      // const workoutSessions = await tx
      //   .select({
      //     session: WorkoutSessionsTable,
      //     exercise: ExercisesTable,
      //     set: WorkoutExerciseSetsTable,
      //   })
      //   .from(WorkoutSessionsTable)
      //   .leftJoin(
      //     WorkoutExerciseSetsTable,
      //     eq(
      //       WorkoutSessionsTable.id,
      //       WorkoutExerciseSetsTable.workoutSessionId,
      //     ),
      //   )
      //   .leftJoin(
      //     WorkoutExercisesTable,
      //     eq(
      //       WorkoutExerciseSetsTable.workoutExerciseId,
      //       WorkoutExercisesTable.exerciseId,
      //     ),
      //   )
      //   .leftJoin(
      //     ExercisesTable,
      //     eq(WorkoutExercisesTable.exerciseId, ExercisesTable.id),
      //   )
      //   .where(eq(WorkoutSessionsTable.workoutPlanId, workoutPlanId));
      // return workoutSessions;
    });
  };
  private getDetailedWorkoutModelByWorkoutPlanId = async (
    workoutPlanId: number,
    workoutSessionId: number,
  ) => {
    return await this.drizzle.db.transaction(async (tx) => {
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
}
