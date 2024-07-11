import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WorkoutService } from 'src/spi/workout/workout';
import { CreateWorkoutWithExercisesDto } from './dto/workout.dto';
import {
  DetailedWorkoutModel,
  ExerciseModel,
  WorkoutExerciseSetsModel,
} from './types/workout.types';
import { eq } from 'drizzle-orm';

import { DrizzleService } from 'src/drizzle/drizzle.service';
import {
  ExercisesTable,
  WorkoutExerciseSetsTable,
  WorkoutExercisesTable,
  WorkoutPlansTable,
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
}
