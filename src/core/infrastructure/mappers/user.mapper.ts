import {
  Challenge as PrismaChallenge,
  Comment as PrismaComment,
  PointTransaction as PrismaPointTransaction,
  Rating as PrismaRating,
  Solution as PrismaSolution,
  User as PrismaUser,
} from '@prisma/client';

import { User } from '@/core/domain/entities/user.entity';

type PrismaUserWithRelations = PrismaUser & {
  solutions?: PrismaSolution[];
  comments?: PrismaComment[];
  ratings?: PrismaRating[];
  completedChallenges?: PrismaChallenge[];
  startedChallenges?: PrismaChallenge[];
  pointTransactions?: PrismaPointTransaction[];
};

export const UserMapper = {
  toDomain(prismaUser: PrismaUserWithRelations): User {
    return new User(
      prismaUser.id,
      prismaUser.name || '',
      prismaUser.email || '',
      prismaUser.image || null,
      prismaUser.bio || null,
      prismaUser.totalPoints,
      prismaUser.rank,
      prismaUser.challengePoints,
      prismaUser.interactionPoints,
      prismaUser.createdAt,
      prismaUser.updatedAt,
      prismaUser.role,
      prismaUser.solutions?.map(s => s.id) || [],
      prismaUser.comments?.map(c => c.id) || [],
      prismaUser.ratings?.map(r => r.id) || [],
      prismaUser.completedChallenges?.map(c => c.id) || [],
      prismaUser.startedChallenges?.map(c => c.id) || [],
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
