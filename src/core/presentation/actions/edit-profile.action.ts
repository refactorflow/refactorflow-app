'use server';

import { z } from 'zod';

import { authActionClient } from '@/config/libs/next-safe-action';

const editProfileAction = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  bio: z.string().min(10).max(1000),
  image: z.string().url().optional(),
});

// export const actionExample = authActionClient.schema(actionExampleSchema).action(async ({ parsedInput, ctx }) => {
//   try {
//     console.log(parsedInput, ctx.user?.id);
//   } catch (error) {
//     throw error;
//   }
// });
