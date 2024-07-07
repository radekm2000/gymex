import { z } from 'zod';

export const CreateWorkoutDtoSchema = z.object({
  name: z.string().max(64),
});

export type CreateWorkoutDto = z.infer<typeof CreateWorkoutDtoSchema>;
