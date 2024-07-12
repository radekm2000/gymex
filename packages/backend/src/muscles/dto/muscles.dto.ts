import { muscleNameEnum } from 'src/db/schema/workout';
import { z } from 'zod';

export const zodMuscleNameEnum = z.enum(muscleNameEnum.enumValues);

export const CreateMuscleDtoSchema = z.object({
  name: zodMuscleNameEnum,
});

export type CreateMuscleDto = z.infer<typeof CreateMuscleDtoSchema>;

export type MuscleName = typeof zodMuscleNameEnum._type;

export type MuscleStats = {
  [key in MuscleName]?: number;
};
