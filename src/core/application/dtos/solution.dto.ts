import { z } from 'zod';

export const CreateSolutionDTO = z.object({
  challengeSlug: z.string(),
  title: z.string().min(5),
  repositoryUrl: z.string().url(),
  description: z.string().min(20),
  implementationDetails: z.string(),
});

export const SolutionResponseDTO = z.object({
  id: z.string(),
  challengeId: z.string(),
  userId: z.string(),
  title: z.string(),
  repositoryUrl: z.string(),
  description: z.string(),
  upvotes: z.number(),
  downvotes: z.number(),
  implementationDetails: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  commentIds: z.array(z.string()),
});

export type CreateSolutionDTO = z.infer<typeof CreateSolutionDTO>;
export type SolutionResponseDTO = z.infer<typeof SolutionResponseDTO>;
