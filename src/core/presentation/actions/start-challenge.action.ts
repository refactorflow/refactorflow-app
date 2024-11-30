'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { URL } from '@/config/constants/url.constant';
import { authActionClient } from '@/config/libs/next-safe-action';
import { EmailSendingError } from '@/core/application/errors/custom.error';
import { container } from '@/core/infrastructure/config/container';

const schema = z.object({
  challengeId: z.string(),
  challengeSlug: z.string(),
});

export const startChallengeAction = authActionClient.schema(schema).action(async ({ parsedInput, ctx }) => {
  try {
    await container.getStartChallengeUseCase().execute(ctx.user.id, parsedInput.challengeId, ctx.user.email!);
    redirect(URL.CHALLENGE_HUB(parsedInput.challengeSlug));
  } catch (error) {
    revalidatePath(URL.CHALLENGE(parsedInput.challengeSlug));

    if (error instanceof EmailSendingError) {
      return { errorMessage: error.message };
    }

    throw error;
  }
});
