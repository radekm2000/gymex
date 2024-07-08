import { AddExerciseToWorkoutDtoSchema } from 'src/exercises/dto/exercises.dto';
import { z } from 'zod';

export const CreateWorkoutWithExercisesDtoSchema = z.object({
  workoutName: z.string().max(64),
  exercises: z.array(AddExerciseToWorkoutDtoSchema).min(1),
});

export type CreateWorkoutWithExercisesDto = z.infer<
  typeof CreateWorkoutWithExercisesDtoSchema
>;
