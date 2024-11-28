import { CreateSubmissionDTO } from '@/core/application/dtos/submission.dto';
import { BadRequestError, NotFoundError } from '@/core/application/errors/custom.error';
import { ChallengeService } from '@/core/application/services/challenge.service';
import { SubmissionService } from '@/core/application/services/submission.service';

export class SubmitChallengeUseCase {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly challengeService: ChallengeService,
  ) {}

  async execute(userId: string, data: CreateSubmissionDTO) {
    const challenge = await this.challengeService.getChallengeById(data.challengeId);
    if (!challenge) {
      throw new NotFoundError('Challenge');
    }

    const existingSubmission = await this.submissionService.getUserChallengeSubmission(userId, data.challengeId);
    if (existingSubmission) {
      throw new BadRequestError('You have already submitted this challenge');
    }

    const submission = await this.submissionService.createSubmission(data, userId);

    await this.challengeService.incrementSubmissionCount(data.challengeId);

    return submission;
  }
}
