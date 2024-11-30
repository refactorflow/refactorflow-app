import { z } from 'zod';

export const SubmitChallengeSolutionSchema = z.object({
  title: z.string().min(5),
  repositoryUrl: z.string().url(),
  description: z.string().min(20),
  implementationDetails: z.string(),
});
