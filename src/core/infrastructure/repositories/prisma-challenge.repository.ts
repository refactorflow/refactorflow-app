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
        title: challenge.title,
        slug: generateSlug(challenge.title),
        description: challenge.description,
        difficulty: challenge.difficulty,
        categoryMain: challenge.category.main,
        subCategories: challenge.category.subCategory,
        starterCodeUrl: challenge.starterCodeUrl,
        authorId: challenge.authorId,
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
      data: { solutionCount: { increment: 1 } },
    });
  }

  async updateAverageRating(id: string): Promise<void> {
    await this.prisma.challenge.update({
      where: { id },
      data: { averageRating: { increment: 1 } },
    });
  }

  async startChallenge(challengeId: string, userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        startedChallenges: {
          connect: { id: challengeId },
        },
      },
    });
  }

  async getStartedChallenges(userId: string): Promise<Challenge[]> {
    const challenges = await this.prisma.challenge.findMany({
      where: { startedBy: { some: { id: userId } } },
    });
    return challenges.map(challenge => this.mapToDomain(challenge));
  }

  async isStartedByUser(challengeId: string, userId: string): Promise<boolean> {
    const count = await this.prisma.challenge.count({
      where: {
        id: challengeId,
        startedBy: {
          some: {
            id: userId,
          },
        },
      },
    });

    return count > 0;
  }

  private mapToDomain(prismaChallenge: PrismaChallenge): Challenge {
    const challengeCategory = {
      main: prismaChallenge.categoryMain,
      subCategory: prismaChallenge.subCategories || [],
    };

    return new Challenge(
      prismaChallenge.id,
      prismaChallenge.title,
      prismaChallenge.slug,
      prismaChallenge.description,
      prismaChallenge.difficulty,
      challengeCategory,
      prismaChallenge.starterCodeUrl,
      prismaChallenge.createdAt,
      prismaChallenge.updatedAt,
      prismaChallenge.authorId,
      prismaChallenge.solutionCount,
      prismaChallenge.averageRating,
    );
  }
}
