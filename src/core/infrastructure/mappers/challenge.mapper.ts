import {
  Challenge as PrismaChallenge,
  Rating as PrismaRating,
  Solution as PrismaSolution,
  Tag as PrismaTag,
} from '@prisma/client';

import { Challenge } from '@/core/domain/entities/challenge.entity';
import { generateSlug } from '@/core/domain/utils/generate-slug';

type PrismaChallengeWithRelations = PrismaChallenge & {
  solutions?: PrismaSolution[];
  ratings?: PrismaRating[];
  tags?: PrismaTag[];
};

export const ChallengeMapper = {
  toDomain(prismaChallenge: PrismaChallengeWithRelations): Challenge {
    return new Challenge(
      prismaChallenge.id,
      prismaChallenge.title,
      prismaChallenge.slug,
      prismaChallenge.description,
      prismaChallenge.difficulty,
      prismaChallenge.categoryMain,
      prismaChallenge.subCategories,
      prismaChallenge.starterCodeUrl,
      prismaChallenge.createdAt,
      prismaChallenge.updatedAt,
      prismaChallenge.authorId,
      prismaChallenge.solutionCount,
      prismaChallenge.averageRating,
      prismaChallenge.solutions?.map(s => s.id) || [],
      prismaChallenge.ratings?.map(r => r.id) || [],
      prismaChallenge.tags?.map(t => t.id) || [],
    );
  },

  toPrisma(data: Partial<Challenge>) {
    return {
      title: data.title ?? '',
      slug: generateSlug(data.title ?? ''),
      description: data.description ?? '',
      difficulty: data.difficulty ?? 'BEGINNER',
      categoryMain: data.categoryMain ?? 'FRONTEND',
      subCategories: data.subCategories ?? [],
      starterCodeUrl: data.starterCodeUrl ?? '',
      authorId: data.authorId ?? '',
    };
  },
};
