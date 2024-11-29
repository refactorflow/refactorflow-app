import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action';

import { auth } from '@/config/server/auth';
import { CustomError, UnauthorizedError } from '@/core/application/errors/custom.error';

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error('Action error:', e.message);

    if (e instanceof CustomError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();

  if (!session?.user) {
    throw new UnauthorizedError('Please login to continue');
  }

  return next({ ctx: { user: session.user } });
});
