import { CreateSolutionDTO, SolutionResponseDTO } from '@/core/application/dtos/solution.dto';
import { BadRequestError, NotFoundError } from '@/core/application/errors/custom.error';
import { SolutionRepository } from '@/core/application/ports/solution.repository';

export class SolutionService {
  constructor(private readonly solutionRepository: SolutionRepository) {}

  async createSolution(data: CreateSolutionDTO, userId: string): Promise<SolutionResponseDTO> {
    try {
      const validatedData = CreateSolutionDTO.parse(data);

      const submission = await this.solutionRepository.createSolution({
        ...validatedData,
        userId,
        upvotes: 0,
        downvotes: 0,
      });

      return SolutionResponseDTO.parse(submission);
    } catch (error) {
      throw new BadRequestError('Error creating submission', { error });
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
