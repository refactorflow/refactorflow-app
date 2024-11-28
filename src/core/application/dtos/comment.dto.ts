import { z } from 'zod';

export const CreateCommentDTO = z.object({
  submissionId: z.string(),
  content: z.string().min(1),
  parentCommentId: z.string().optional(),
});

export type CreateCommentDTO = z.infer<typeof CreateCommentDTO>;
