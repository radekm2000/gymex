import { muscleNameEnum } from 'src/db/schema/workout';
import { z } from 'zod';

const zodMuscleNameEnum = z.enum(muscleNameEnum.enumValues);

export const CreateExerciseDtoSchema = z.object({
  exerciseName: z.string().max(32),
  description: z.string().nullish().default(''),
  isDefault: z.boolean().default(false),
  userId: z.number().nullish(),
  muscleTargeted: zodMuscleNameEnum,
  isCreatorDeveloper: z.boolean(),
});

export type CreateExerciseDto = z.infer<typeof CreateExerciseDtoSchema>;
