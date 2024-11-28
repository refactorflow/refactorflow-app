import { z } from 'zod';

export const CreateRatingDTO = z.object({
  challengeId: z.string(),
  score: z.number().min(1).max(5),
  review: z.string().optional(),
});

export type CreateRatingDTO = z.infer<typeof CreateRatingDTO>;
