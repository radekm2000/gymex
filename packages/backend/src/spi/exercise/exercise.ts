import { UserRoles } from 'src/auth/utils/RoleGuard';
import { CreateExerciseDto } from 'src/exercises/dto/exercises.dto';
import { ExerciseModel } from 'src/workouts/types/workout.types';

export const ExerciseService = Symbol('ExerciseService');

export interface ExerciseService {
  create(
    dto: CreateExerciseDto,
    userId: number,
    role: UserRoles.Admin | UserRoles.User,
  ): Promise<ExerciseModel>;

  getAll(): Promise<ExerciseModel[]>;
}
