import { ChallengeResponseDTO, CreateChallengeDTO } from '@/core/application/dtos/challenge.dto';
import { BadRequestError, NotFoundError } from '@/core/application/errors/custom.error';
import { ChallengeRepository } from '@/core/application/ports/challenge.repository';
import { Challenge } from '@/core/domain/entities/challenge.entity';

export class ChallengeService {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async createChallenge(data: CreateChallengeDTO): Promise<ChallengeResponseDTO> {
    try {
      const validatedData = CreateChallengeDTO.parse(data);
      const challenge = await this.challengeRepository.createChallenge(validatedData);
      return ChallengeResponseDTO.parse(challenge);
    } catch (error) {
      throw new BadRequestError('Invalid challenge data', { error });
    }
  }

  async getChallengeById(id: string): Promise<ChallengeResponseDTO> {
    try {
      const challenge = await this.challengeRepository.getChallengeById(id);
      if (!challenge) {
        throw new NotFoundError('Challenge');
      }

      return ChallengeResponseDTO.parse(challenge);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError('Error fetching challenge', { error });
    }
  }

  async getAllChallenges(filters?: {
    difficulty?: Challenge['difficulty'];
    category?: Challenge['category']['main'];
    tags?: string[];
  }): Promise<ChallengeResponseDTO[]> {
    try {
      const challenges = await this.challengeRepository.getAllChallenges(filters);
      return challenges.map(challenge => ChallengeResponseDTO.parse(challenge));
    } catch (error) {
      throw new BadRequestError('Error fetching challenges', { error });
    }
  }

  async incrementSubmissionCount(id: string): Promise<void> {
    try {
      await this.challengeRepository.updateSubmissionCount(id);
    } catch (error) {
      throw new BadRequestError('Error incrementing submission count', { error });
    }
  }
}
