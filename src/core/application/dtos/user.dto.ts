import { z } from 'zod';

export const UserResponseDTO = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().nullable(),
  bio: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  completedChallenges: z.array(z.string()).default([]),
  solutions: z.array(z.string()).default([]),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
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
