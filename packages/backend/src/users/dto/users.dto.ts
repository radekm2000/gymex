import { z } from 'zod';

export const CreateUserDtoSchema = z.object({
  username: z.string({
    required_error: 'Username is required',
  }),
  weight: z.string({
    required_error: 'Weight is required',
  }),
  height: z.string({
    required_error: 'Height is required',
  }),
});

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;

export const DiscordProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string().nullish(),
});

export type DiscordProfile = z.infer<typeof DiscordProfileSchema>;
