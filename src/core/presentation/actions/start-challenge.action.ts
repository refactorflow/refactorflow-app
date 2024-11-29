'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { authActionClient } from '@/config/libs/next-safe-action';
import { container } from '@/core/infrastructure/config/container';

const schema = z.object({
  challengeId: z.string(),
  challengeSlug: z.string(),
});

export const startChallengeAction = authActionClient.schema(schema).action(async ({ parsedInput, ctx }) => {
  try {
    await container.getChallengeService().startChallenge(parsedInput.challengeId, ctx.user.id);
  } catch (error) {
    throw error;
  }

  revalidatePath(`/challenges/${parsedInput.challengeSlug}`);
});