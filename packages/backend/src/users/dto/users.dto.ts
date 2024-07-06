import { z } from 'zod';

export const UpdateUserDtoSchema = z.object({
  username: z.string().optional(),
  weight: z.string({
    required_error: 'Weight is required',
  }),
  height: z.string({
    required_error: 'Height is required',
  }),
});

export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema>;

export const DiscordProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string().nullish(),
});

export type DiscordProfile = z.infer<typeof DiscordProfileSchema>;
