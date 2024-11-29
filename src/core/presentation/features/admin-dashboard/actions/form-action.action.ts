'use server';

import { z } from 'zod';

import { authActionClient } from '@/config/libs/next-safe-action';

const actionExampleSchema = z.object({
  challengeId: z.string(),
  authorId: z.string(),
  title: z.string(),
  description: z.string(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  category: z.object({
    main: z.enum(['FRONTEND', 'BACKEND', 'FULLSTACK']),
    subCategory: z.array(z.string()),
  }),
  starterCodeUrl: z.string().url(),
  requirements: z.object({
    functional: z.array(z.string()),
    technical: z.array(z.string()),
  }),
});

export const actionExample = authActionClient.schema(actionExampleSchema).action(async ({ parsedInput, ctx }) => {
  try {
    console.log(parsedInput, ctx.user?.id);
  } catch (error) {
    throw error;
  }
});
