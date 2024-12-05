import { z } from 'zod';

export const editProfileSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  bio: z.string().min(10).max(1000),
  image: z.string().url().optional(),
});
