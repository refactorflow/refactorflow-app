import { z } from 'zod';

export const CreateChallengeDTO = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  category: z.object({
    main: z.enum(['FRONTEND', 'BACKEND', 'FULLSTACK']),
    subCategory: z.array(z.string()),
  }),
  starterCodeUrl: z.string().url(),
  authorId: z.string(),
});

export const ChallengeResponseDTO = CreateChallengeDTO.extend({
  id: z.string(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  submissionCount: z.number().default(0),
  averageRating: z.number().default(0),
});

export type CreateChallengeDTO = z.infer<typeof CreateChallengeDTO>;
export type ChallengeResponseDTO = z.infer<typeof ChallengeResponseDTO>;
