import {
  Challenge as PrismaChallenge,
  Comment as PrismaComment,
  Solution as PrismaSolution,
  User as PrismaUser,
} from '@prisma/client';

import { Solution } from '@/core/domain/entities/solution.entity';

type PrismaSolutionWithRelations = PrismaSolution & {
  challenge: PrismaChallenge;
  user: PrismaUser;
  comments?: PrismaComment[];
};

export const SolutionMapper = {
  toDomain(prismaSolution: PrismaSolutionWithRelations): Solution {
    return new Solution(
      prismaSolution.id,
      prismaSolution.challengeId,
      prismaSolution.userId,
      prismaSolution.title,
      prismaSolution.repositoryUrl,
      prismaSolution.description,
      prismaSolution.upvotes,
      prismaSolution.downvotes,
      prismaSolution.implementationDetails,
      prismaSolution.createdAt,
      prismaSolution.updatedAt,
      prismaSolution.comments?.map(c => c.id) || [],
    );
  },

  toPrisma(solution: Partial<Solution>) {
    return {
      title: solution.title || '',
      repositoryUrl: solution.repositoryUrl || '',
      description: solution.description || '',
      implementationDetails: solution.implementationDetails || '',
      upvotes: solution.upvotes ?? 0,
      downvotes: solution.downvotes ?? 0,
      challenge: { connect: { id: solution.challengeId } },
      user: { connect: { id: solution.userId } },
    };
  },
};
