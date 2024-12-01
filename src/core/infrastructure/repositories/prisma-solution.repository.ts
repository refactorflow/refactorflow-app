import { PrismaClient, Solution as PrismaSolution } from '@prisma/client';

import { SolutionRepository } from '@/core/application/ports/solution.repository';
import { Solution } from '@/core/domain/entities/solution.entity';

import { SolutionMapper } from '../mappers/solution.mapper';

export class PrismaSolutionRepository implements SolutionRepository {
  constructor(private prisma: PrismaClient) {}

  async createSolution(solution: Partial<Solution>): Promise<Solution> {
    const prismaSolution = await this.prisma.solution.create({
      data: SolutionMapper.toPrisma(solution),
      include: {
        challenge: true,
        user: true,
      },
    });

    return SolutionMapper.toDomain(prismaSolution);
  }

  async getSolutionsByUser(userId: string): Promise<Solution[]> {
    const solutions = await this.prisma.solution.findMany({
      where: { userId },
      include: {
        challenge: true,
      },
    });

    return solutions.map(solution => this.mapToDomain(solution));
  }

  private mapToDomain(prismaSolution: PrismaSolution): Solution {
    const votes = {
      upvotes: prismaSolution.upvotes,
      downvotes: prismaSolution.downvotes,
    };

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
    );
  }
}
