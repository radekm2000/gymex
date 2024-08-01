import { z } from "zod";

export const ExerciseSetSchema = z.object({
  exerciseSetNumber: z.string().default("1"),
  reps: z.string().default("10"),
  weight: z.string().default("0"),
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

export const CreateWorkoutWithExercisesDtoSchema = z.object({
  workoutName: z.string().max(64),
  exercises: z.array(AddExerciseToWorkoutDtoSchema).min(1),
});

export type CreateWorkoutWithExercisesDto = z.infer<
  typeof CreateWorkoutWithExercisesDtoSchema
>;
