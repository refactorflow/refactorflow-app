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
        status: 'PENDING',
        votes: {
          upvotes: 0,
          downvotes: 0,
        },
      });
      return SolutionResponseDTO.parse(submission);
    } catch (error) {
      throw new BadRequestError('Error creating submission', { error });
    }
  }

  async getUserChallengeSolution(userId: string, challengeId: string): Promise<SolutionResponseDTO | null> {
    try {
      const solution = await this.solutionRepository.getSolutionsByUser(userId);
      if (!solution) {
        throw new NotFoundError('Challenge Submission');
      }

      return SolutionResponseDTO.parse(solution.find(solution => solution.challengeId === challengeId) || null);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError('Error fetching user challenge submission', { error });
    }
  }
}
