import { z } from 'zod';

export const CreateSolutionDTO = z.object({
  challengeId: z.string(),
  challengeSlug: z.string(),
  title: z.string().min(5),
  repositoryUrl: z.string().url(),
  description: z.string().min(20),
  implementationDetails: z.string(),
});

export const SolutionResponseDTO = CreateSolutionDTO.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateSolutionDTO = z.infer<typeof CreateSolutionDTO>;
export type SolutionResponseDTO = z.infer<typeof SolutionResponseDTO>;
