import { z } from 'zod';

export const formCreateChallengeSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  categoryMain: z.enum(['FRONTEND', 'BACKEND', 'FULLSTACK']),
  subCategories: z.array(z.object({ label: z.string(), value: z.string() })),
  starterCodeUrl: z.string().url(),
});
