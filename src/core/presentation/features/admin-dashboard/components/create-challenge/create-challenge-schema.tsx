import { z } from 'zod';

export const formCreateChallengeSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  category: z.object({
    main: z.enum(['FRONTEND', 'BACKEND', 'FULLSTACK']),
    subCategory: z.array(z.object({ label: z.string(), value: z.string() })),
  }),
  starterCodeUrl: z.string().url(),
  // requirements: z.object({
  //   functional: z.array(z.string()),
  //   technical: z.array(z.string()),
  // }),
});