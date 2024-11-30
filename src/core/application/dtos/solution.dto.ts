import { z } from 'zod';

export const CreateSolutionDTO = z.object({
  challengeId: z.string(),
  title: z.string().min(5),
  repositoryUrl: z.string().url(),
  livePreviewUrl: z.string().url().optional(),
  description: z.string().min(20),
  implementationDetails: z.string().optional(),
});

export const SolutionResponseDTO = CreateSolutionDTO.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateSolutionDTO = z.infer<typeof SolutionResponseDTO>;
export type SolutionResponseDTO = z.infer<typeof SolutionResponseDTO>;
