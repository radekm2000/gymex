import { CreateWorkoutDto } from 'src/workout/dto/workout.dto';
import { WorkoutModel } from 'src/workout/types/workout.types';

export const WorkoutService = Symbol('WorkoutService');

export interface WorkoutService {
  createWorkout(dto: CreateWorkoutDto, userId: number): Promise<WorkoutModel>;
}
