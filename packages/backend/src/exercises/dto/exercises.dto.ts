import { zodMuscleNameEnum } from 'src/muscles/dto/muscles.dto';
import { z } from 'zod';

export const CreateExerciseDtoSchema = z.object({
  exerciseName: z.string().max(32),
  description: z.string().nullish().default(''),
  isDefault: z.boolean().default(false),
  userId: z.number().nullish().default(0),
  muscleTargeted: zodMuscleNameEnum,
  isCreatorDeveloper: z.boolean().default(false),
});

export type CreateExerciseDto = z.infer<typeof CreateExerciseDtoSchema>;
