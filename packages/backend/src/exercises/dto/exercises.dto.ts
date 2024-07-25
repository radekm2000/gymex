import { zodMuscleNameEnum } from 'src/muscles/dto/muscles.dto';
import { z } from 'zod';

//add duration time to exercise for i.e holds

//TODO change sets rest time to entire exercise

export const CreateExerciseDtoSchema = z.object({
  exerciseName: z.string().max(32),
  notes: z.string().nullish().default(''),
  isDefault: z.boolean().default(false),
  userId: z.number().nullish().default(0),
  muscleTargeted: zodMuscleNameEnum,
  isCreatorDeveloper: z.boolean().default(false),
  restTime: z.string().default('60'),
});

export type CreateExerciseDto = z.infer<typeof CreateExerciseDtoSchema>;

const ExerciseSetSchema = z.object({
  exerciseSetNumber: z.string().default('1'),
  reps: z.string().default('10'),
  weight: z.string().default('0'),
  rir: z.string().optional(),
  tempo: z.string().optional(),
  isStaticSet: z.boolean().optional(),
  holdSecs: z.string().optional(),
});

export type ExerciseSetDto = z.infer<typeof ExerciseSetSchema>;

export const AddExerciseToWorkoutDtoSchema = z.object({
  id: z.number(),
  notes: z.string().optional(),
  sets: z.array(ExerciseSetSchema).min(1),
  orderIndex: z.number().int().nonnegative(),
});

export type AddExerciseToWorkoutDto = z.infer<
  typeof AddExerciseToWorkoutDtoSchema
>;
