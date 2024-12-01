import { z } from 'zod';

export const UserResponseDTO = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().nullable(),
  bio: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
  totalPoints: z.number().default(0),
  rank: z.number().nullable(),
  challengePoints: z.number().default(0),
  interactionPoints: z.number().default(0),
  solutionIds: z.array(z.string()).default([]),
  commentsIds: z.array(z.string()).default([]),
  ratingsIds: z.array(z.string()).default([]),
  pointTransactionIds: z.array(z.string()).default([]),
  completedChallengeIds: z.array(z.string()).default([]),
  startedChallengeIds: z.array(z.string()).default([]),
});

export const UpdateUserDTO = z
  .object({
    username: z.string().min(3).max(50).optional(),
    bio: z.string().max(500).optional(),
    avatar: z.string().url().optional(),
  })
  .refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

export type UserResponseDTO = z.infer<typeof UserResponseDTO>;
export type UpdateUserDTO = z.infer<typeof UpdateUserDTO>;
