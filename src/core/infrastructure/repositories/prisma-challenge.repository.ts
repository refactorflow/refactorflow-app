import { Challenge as PrismaChallenge, PrismaClient } from '@prisma/client';

import { ChallengeRepository } from '@/core/application/ports/challenge.repository';
import { Challenge } from '@/core/domain/entities/challenge.entity';
import { generateSlug } from '@/core/domain/utils/generate-slug';

export class PrismaChallengeRepository implements ChallengeRepository {
  constructor(private prisma: PrismaClient) {}

  async createChallenge(
    challenge: Omit<Challenge, 'id' | 'createdAt' | 'updatedAt' | 'submissionCount' | 'averageRating'>,
  ): Promise<Challenge> {
    const prismaChallenge = await this.prisma.challenge.create({
      data: {
        ...challenge,
        categoryMain: challenge.category.main,
        subCategories: challenge.category.subCategory,
        slug: generateSlug(challenge.title),
      },
    });

    return this.mapToDomain(prismaChallenge);
  }

  async getChallengeById(id: string): Promise<Challenge | null> {
    const prismaChallenge = await this.prisma.challenge.findUnique({
      where: { id },
    });
    return prismaChallenge ? this.mapToDomain(prismaChallenge) : null;
  }

  async getChallengeBySlug(slug: string): Promise<Challenge | null> {
    const prismaChallenge = await this.prisma.challenge.findUnique({
      where: { slug },
    });
    return prismaChallenge ? this.mapToDomain(prismaChallenge) : null;
  }

  async getAllChallenges(): Promise<Challenge[]> {
    const challenges = await this.prisma.challenge.findMany();

    return challenges.map(challenge => this.mapToDomain(challenge));
  }

  async updateChallenge(id: string, data: Partial<Challenge>): Promise<Challenge> {
    const prismaChallenge = await this.prisma.challenge.update({
      where: { id },
      data,
    });
    return this.mapToDomain(prismaChallenge);
  }

  async deleteChallenge(id: string): Promise<void> {
    await this.prisma.challenge.delete({
      where: { id },
    });
  }

  async updateSubmissionCount(id: string): Promise<void> {
    await this.prisma.challenge.update({
      where: { id },
      data: { submissionCount: { increment: 1 } },
    });
  }

  async updateAverageRating(id: string): Promise<void> {
    await this.prisma.challenge.update({
      where: { id },
      data: { averageRating: { increment: 1 } },
    });
  }

  private mapToDomain(prismaChallenge: PrismaChallenge): Challenge {
    const challengeCategory = {
      main: prismaChallenge.categoryMain,
      subCategory: prismaChallenge.subCategories || [],
    };

    const challengeRequirements = (prismaChallenge.requirements as { technical: string[]; functional: string[] }) ?? {
      technical: [],
      functional: [],
    };

    const challengeExpectedOutput = prismaChallenge.expectedOutput
      ? {
          screenshots: (prismaChallenge.expectedOutput as any)?.screenshots ?? [],
          videoDemo: (prismaChallenge.expectedOutput as any)?.videoDemo,
        }
      : undefined;

    return new Challenge(
      prismaChallenge.id,
      prismaChallenge.title,
      prismaChallenge.slug,
      prismaChallenge.description,
      prismaChallenge.difficulty,
      challengeCategory,
      prismaChallenge.starterCodeUrl,
      challengeRequirements,
      prismaChallenge.createdAt,
      prismaChallenge.updatedAt,
      prismaChallenge.authorId,
      prismaChallenge.submissionCount,
      prismaChallenge.averageRating,
      challengeExpectedOutput,
    );
  }
}
