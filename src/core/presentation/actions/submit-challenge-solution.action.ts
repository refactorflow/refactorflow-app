'use server';

import { z } from 'zod';

import { authActionClient } from '@/config/libs/next-safe-action';
import { container } from '@/core/infrastructure/config/container';

const submitChallengeSolutionActionSchema = z.object({
  challengeSlug: z.string(),
  title: z.string().min(5),
  repositoryUrl: z.string().url(),
  description: z.string().min(20),
  implementationDetails: z.string(),
});

export const submitChallengeSolutionAction = authActionClient
  .schema(submitChallengeSolutionActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    try {
      await container.getSubmitChallengeSolutionUseCase().execute(ctx.user.id, {
        ...parsedInput,
        challengeSlug: parsedInput.challengeSlug,
      });
    } catch (error) {
      throw error;
    }
  });
