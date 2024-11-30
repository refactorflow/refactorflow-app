import { Challenge as PrismaChallenge, Solution as PrismaSolution, User as PrismaUser } from '@prisma/client';

import { User } from '@/core/domain/entities/user.entity';

type PrismaUserWithRelations = PrismaUser & {
  solutions?: PrismaSolution[];
  completedChallenges?: PrismaChallenge[];
};

export const UserMapper = {
  toDomain(prismaUser: PrismaUserWithRelations): User {
    return new User(
      prismaUser.id,
      prismaUser.name || '',
      prismaUser.email || '',
      prismaUser.image || null,
      prismaUser.bio || null,
      prismaUser.createdAt,
      prismaUser.updatedAt,
      prismaUser.completedChallenges?.map(c => c.id) || [],
      prismaUser.solutions || [],
    );
  },

  toPrisma(data: Partial<User>) {
    return {
      name: data.username,
      email: data.email,
      image: data.avatar,
      bio: data.bio,
    };
  },
};
