'use server';

import { z } from 'zod';

import { authActionClient } from '@/config/libs/next-safe-action';

const actionExampleSchema = z.object({
  name: z.string(),
  challengeId: z.string(),
});

export const actionExample = authActionClient.schema(actionExampleSchema).action(async ({ parsedInput, ctx }) => {
  try {
    console.log(parsedInput, ctx.user?.id);
  } catch (error) {
    throw error;
  }
});
