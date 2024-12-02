import { SolutionResponseDTO } from '@/core/application/dtos/solution.dto';
import { BadRequestError, NotFoundError } from '@/core/application/errors/custom.error';
import { SolutionRepository } from '@/core/application/ports/solution.repository';
import { Solution } from '@/core/domain/entities/solution.entity';

export type CreateSolutionParams = {
  challengeId: string;
  userId: string;
  title: string;
  repositoryUrl: string;
  description: string;
  implementationDetails?: string;
};

export class SolutionService {
  constructor(private readonly solutionRepository: SolutionRepository) {}

  async createSolution(data: CreateSolutionParams): Promise<Solution> {
    try {
      const solution = Solution.create(data);
      return await this.solutionRepository.createSolution(solution);
    } catch (error) {
      throw new BadRequestError('Error creating solution', { error });
    }
  }

  async getUserChallengeSolution(userId: string, challengeId: string): Promise<SolutionResponseDTO | null> {
    try {
      const solutions = await this.solutionRepository.getSolutionsByUser(userId);
      const solution = solutions.find(solution => solution.challengeId === challengeId);

      if (!solution) return null;

      const solutionData = {
        id: solution.id,
        challengeId: solution.challengeId,
        challengeSlug: '',
        userId: solution.userId,
        title: solution.title,
        repositoryUrl: solution.repositoryUrl,
        description: solution.description,
        upvotes: solution.upvotes,
        downvotes: solution.downvotes,
        implementationDetails: solution.implementationDetails || '',
        createdAt: solution.createdAt,
        updatedAt: solution.updatedAt,
      };

      return SolutionResponseDTO.parse(solutionData);
    } catch (error) {
      if (error instanceof NotFoundError) console.log(error);
      console.error('Parse error:', error);
      throw new BadRequestError('Error fetching user challenge submission', { error });
    }
  }
}
