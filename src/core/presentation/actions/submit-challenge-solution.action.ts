'use server';

import { authActionClient } from '@/config/libs/next-safe-action';
import { CreateSolutionDTO } from '@/core/application/dtos/solution.dto';
import { container } from '@/core/infrastructure/config/container';

export const submitChallengeSolutionAction = authActionClient
  .schema(CreateSolutionDTO)
  .action(async ({ parsedInput, ctx }) => {
    try {
      const params = { ...parsedInput, userId: ctx.user.id };
      await container.getSubmitChallengeSolutionUseCase().execute(params);
    } catch (error) {
      throw error;
    }
  });
