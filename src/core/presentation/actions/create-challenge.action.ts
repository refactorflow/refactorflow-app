'use server';

import { z } from 'zod';

import { adminActionClient } from '@/config/libs/next-safe-action';
import { container } from '@/core/infrastructure/config/container';

const createChallengeActionSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  categoryMain: z.enum(['FRONTEND', 'BACKEND', 'FULLSTACK']),
  subCategories: z.array(z.string()),
  starterCodeUrl: z.string().url(),
});

export const createChallengeAction = adminActionClient
  .schema(createChallengeActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    try {
      await container.getChallengeService().createChallenge({
        ...parsedInput,
        authorId: ctx.user.id,
      });
    } catch (error) {
      throw error;
    }
  });
