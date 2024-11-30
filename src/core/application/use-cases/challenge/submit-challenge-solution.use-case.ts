import { CreateSolutionDTO } from '@/core/application/dtos/solution.dto';
import { BadRequestError, NotFoundError } from '@/core/application/errors/custom.error';
import { ChallengeService } from '@/core/application/services/challenge.service';
import { SolutionService } from '@/core/application/services/solution.service';

type CreateSolutionUseCaseDTO = Omit<CreateSolutionDTO, 'challengeId'>;

export class SubmitChallengeSolutionUseCase {
  constructor(
    private readonly solutionService: SolutionService,
    private readonly challengeService: ChallengeService,
  ) {}

  async execute(userId: string, data: CreateSolutionUseCaseDTO) {
    if (!data.challengeSlug) throw new BadRequestError('Challenge slug is required');

    const challenge = await this.challengeService.getChallengeBySlug(data.challengeSlug);
    if (!challenge) {
      throw new NotFoundError('Challenge');
    }

    const existingSubmission = await this.solutionService.getUserChallengeSolution(userId, challenge.id);
    if (existingSubmission) {
      throw new BadRequestError('You have already submitted this challenge');
    }

    const submission = await this.solutionService.createSolution({ ...data, challengeId: challenge.id }, userId);

    await this.challengeService.incrementSubmissionCount(challenge.id);

    return submission;
  }
}
