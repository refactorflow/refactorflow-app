import { z } from 'zod';

export const CreateSubmissionDTO = z.object({
  challengeId: z.string(),
  repositoryUrl: z.string().url(),
  livePreviewUrl: z.string().url().optional(),
  description: z.string().min(20),
  implementationDetails: z.string().optional(),
});

export const SubmissionResponseDTO = CreateSubmissionDTO.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateSubmissionDTO = z.infer<typeof CreateSubmissionDTO>;
export type SubmissionResponseDTO = z.infer<typeof SubmissionResponseDTO>;
