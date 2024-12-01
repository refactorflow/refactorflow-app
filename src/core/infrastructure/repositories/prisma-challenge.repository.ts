import { PrismaClient } from '@prisma/client';

import { ChallengeRepository } from '@/core/application/ports/challenge.repository';
import { Challenge } from '@/core/domain/entities/challenge.entity';

import { ChallengeMapper } from '../mappers/challenge.mapper';

export class PrismaChallengeRepository implements ChallengeRepository {
  constructor(private prisma: PrismaClient) {}

  async createChallenge(data: Partial<Challenge>): Promise<Challenge> {
    const prismaChallenge = await this.prisma.challenge.create({
      data: ChallengeMapper.toPrisma(data),
    });
    return ChallengeMapper.toDomain(prismaChallenge);
  }

  async getChallengeById(id: string): Promise<Challenge | null> {
    const prismaChallenge = await this.prisma.challenge.findUnique({
      where: { id },
    });
    return prismaChallenge ? ChallengeMapper.toDomain(prismaChallenge) : null;
  }

  async getChallengeBySlug(slug: string): Promise<Challenge | null> {
    const prismaChallenge = await this.prisma.challenge.findUnique({
      where: { slug },
    });
    return prismaChallenge ? ChallengeMapper.toDomain(prismaChallenge) : null;
  }

  async getAllChallenges(): Promise<Challenge[]> {
    const challenges = await this.prisma.challenge.findMany();

    return challenges.map(challenge => ChallengeMapper.toDomain(challenge));
  }

  async updateChallenge(id: string, data: Partial<Challenge>): Promise<Challenge> {
    const prismaChallenge = await this.prisma.challenge.update({
      where: { id },
      data: ChallengeMapper.toPrisma(data),
    });
    return ChallengeMapper.toDomain(prismaChallenge);
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
    return challenges.map(challenge => ChallengeMapper.toDomain(challenge));
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
}
