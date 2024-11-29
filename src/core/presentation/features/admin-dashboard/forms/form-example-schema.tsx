import { z } from 'zod';

export const formExampleSchema = z.object({
  name: z.string().min(1),
});
