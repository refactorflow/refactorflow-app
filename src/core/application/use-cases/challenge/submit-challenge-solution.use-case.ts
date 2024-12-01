import { CreateSolutionDTO } from '@/core/application/dtos/solution.dto';
import { BadRequestError, NotFoundError } from '@/core/application/errors/custom.error';
import { ChallengeService } from '@/core/application/services/challenge.service';
import { EmailService } from '@/core/application/services/email.service';
import { SolutionService } from '@/core/application/services/solution.service';
import { UserService } from '@/core/application/services/user.service';
import { POINTS_SYSTEM } from '@/core/domain/constants/points.constant';

type CreateSolutionUseCaseDTO = Omit<CreateSolutionDTO, 'challengeId'>;

export class SubmitChallengeSolutionUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly solutionService: SolutionService,
    private readonly challengeService: ChallengeService,
    private readonly emailService: EmailService,
  ) {}

  async execute(userId: string, data: CreateSolutionUseCaseDTO) {
    if (!data.challengeSlug) throw new BadRequestError('Challenge slug is required');

    const user = await this.userService.getUserProfile(userId);
    if (!user) throw new NotFoundError('User');

    const challenge = await this.challengeService.getChallengeBySlug(data.challengeSlug);
    if (!challenge) {
      throw new NotFoundError('Challenge');
    }

    const existingSubmission = await this.solutionService.getUserChallengeSolution(userId, challenge.id);
    if (existingSubmission) {
      throw new BadRequestError('You have already submitted this challenge');
    }

    const submission = await this.solutionService.createSolution({ ...data, challengeId: challenge.id }, userId);

    await this.userService.updateUserPoints(
      userId,
      'COMPLETION',
      POINTS_SYSTEM.COMPLETION.CHALLENGE[challenge.difficulty],
    );

    await this.challengeService.incrementSubmissionCount(challenge.id);

    await this.emailService.sendSubmittedChallengeSolutionEmail(user.email, challenge.title);

    return submission;
  }
}
