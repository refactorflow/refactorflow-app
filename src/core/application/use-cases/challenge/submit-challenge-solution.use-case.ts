import { CreateSolutionDTO } from '@/core/application/dtos/solution.dto';
import { BadRequestError, NotFoundError } from '@/core/application/errors/custom.error';
import { ChallengeService } from '@/core/application/services/challenge.service';
import { SolutionService } from '@/core/application/services/solution.service';

export class SubmitChallengeSolutionUseCase {
  constructor(
    private readonly solutionService: SolutionService,
    private readonly challengeService: ChallengeService,
  ) {}

  async execute(userId: string, data: CreateSolutionDTO) {
    const challenge = await this.challengeService.getChallengeById(data.challengeId);
    if (!challenge) {
      throw new NotFoundError('Challenge');
    }

    const existingSubmission = await this.solutionService.getUserChallengeSolution(userId, data.challengeId);
    if (existingSubmission) {
      throw new BadRequestError('You have already submitted this challenge');
    }

    const submission = await this.solutionService.createSolution(data, userId);

    await this.challengeService.incrementSubmissionCount(data.challengeId);

    return submission;
  }
}
