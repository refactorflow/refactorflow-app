import { PrismaClient } from '@prisma/client';

import { ChallengeRepository } from '@/core/application/ports/challenge.repository';
import { Challenge } from '@/core/domain/entities/challenge.entity';

export class PrismaChallengeRepository implements ChallengeRepository {
  constructor(private prisma: PrismaClient) {}

  async createChallenge(
    challenge: Omit<Challenge, 'id' | 'createdAt' | 'updatedAt' | 'submissionCount' | 'averageRating'>,
  ): Promise<Challenge> {
    const prismaChallenge = await this.prisma.challenge.create({
      data: {
        ...challenge,
        categoryMain: challenge.category.main,
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

  private mapToDomain(prismaChallenge: any): Challenge {
    return new Challenge(
      prismaChallenge.id,
      prismaChallenge.title,
      prismaChallenge.description,
      prismaChallenge.difficulty,
      prismaChallenge.category,
      prismaChallenge.starterCodeUrl,
      prismaChallenge.requirements,
      prismaChallenge.createdAt,
      prismaChallenge.updatedAt,
      prismaChallenge.authorId,
      prismaChallenge.submissionCount,
      prismaChallenge.averageRating,
    );
  }
}
