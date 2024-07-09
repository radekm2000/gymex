import { AddExerciseToWorkoutDto } from 'src/exercises/dto/exercises.dto';
import { CreateWorkoutWithExercisesDto } from 'src/workouts/dto/workout.dto';
import { DetailedWorkoutModel } from 'src/workouts/types/workout.types';

export const WorkoutService = Symbol('WorkoutService');

export interface WorkoutService {
  createWorkoutWithExercises(
    dto: CreateWorkoutWithExercisesDto,
    userId: number,
  ): Promise<DetailedWorkoutModel>;
  addExercisesToWorkout(
    workoutPlanId: number,
    userId: number,
    dto: AddExerciseToWorkoutDto,
  ): Promise<DetailedWorkoutModel>;
}
