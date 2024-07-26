import { ChartData } from 'src/exercises/chart/chart.model';
import { AddExerciseToWorkoutDto } from 'src/exercises/dto/exercises.dto';
import { CreateWorkoutWithExercisesDto } from 'src/workouts/dto/workout.dto';
import { Workout } from 'src/workouts/model/workout.model';
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

  startWorkout(
    workoutPlanId: number,
    userId: number,
  ): Promise<DetailedWorkoutModel>;

  finishWorkout(
    workoutPlanId: number,
    userId: number,
    dto: CreateWorkoutWithExercisesDto,
  ): Promise<DetailedWorkoutModel>;

  getSessionsByWorkoutPlan(workoutPlanId: number): Promise<Workout[]>;

  getAll(): Promise<DetailedWorkoutModel[]>;

  getChartModel(
    exerciseId: number,
    workoutPlanId: number,
  ): Promise<ChartData[]>;
}
