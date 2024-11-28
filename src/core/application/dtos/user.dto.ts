import { z } from 'zod';

export const UpdateUserDTO = z
  .object({
    username: z.string().min(3).max(50).optional(),
    bio: z.string().max(500).optional(),
    avatar: z.string().url().optional(),
  })
  .refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

export type UpdateUserDTO = z.infer<typeof UpdateUserDTO>;

export const UserResponseDTO = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().url().nullable(),
  bio: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  completedChallenges: z.array(z.string()),
  submissions: z.array(z.string()),
});

export type UserResponseDTO = z.infer<typeof UserResponseDTO>;
