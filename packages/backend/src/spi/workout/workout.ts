import { CreateWorkoutDto } from 'src/workouts/dto/workout.dto';
import { WorkoutModel } from 'src/workouts/types/workout.types';

export const WorkoutService = Symbol('WorkoutService');

export interface WorkoutService {
  createWorkout(dto: CreateWorkoutDto, userId: number): Promise<WorkoutModel>;
}
