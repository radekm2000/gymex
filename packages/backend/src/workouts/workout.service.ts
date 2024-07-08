import { Injectable } from '@nestjs/common';
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
              restTime: set.restTime,
            })),
          )
          .returning();

        allExerciseSets.push(...exerciseSets);
      }

      return Workout.from(workoutPlan, exercises, allExerciseSets)
        .detailedWorkoutModel;
    });
  };

  public addExercisesToWorkout = async () => {
    return;
  };
}
