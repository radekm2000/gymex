import { z } from 'zod';

export const UpdateUserDtoSchema = z.object({
  displayName: z.string().optional(),
  weight: z
    .string()
    .optional()
    .refine(
      (v) => {
        if (v === undefined || '') {
          return true;
        } else {
          const n = Number(v);
          return !isNaN(n);
        }
      },
      { message: 'Invalid weight' },
    ),
  height: z
    .string()
    .optional()
    .refine(
      (v) => {
        if (v === undefined || '') {
          return true;
        } else {
          const n = Number(v);
          return !isNaN(n);
        }
      },
      { message: 'Invalid height' },
    ),
});

export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema>;

export const DiscordProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string().nullish(),
});

export type DiscordProfile = z.infer<typeof DiscordProfileSchema>;
