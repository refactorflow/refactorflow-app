import { BadRequestError, NotFoundError } from '@/core/application/errors/custom.error';
import { ChallengeService } from '@/core/application/services/challenge.service';
import { EmailService } from '@/core/application/services/email.service';
import { CreateSolutionParams, SolutionService } from '@/core/application/services/solution.service';
import { UserService } from '@/core/application/services/user.service';
import { POINTS_SYSTEM } from '@/core/domain/constants/points.constant';

type CreateSolutionUseCase = Omit<CreateSolutionParams, 'challengeId'> & { challengeSlug: string };

export class SubmitChallengeSolutionUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly solutionService: SolutionService,
    private readonly challengeService: ChallengeService,
    private readonly emailService: EmailService,
  ) {}

  async execute(data: CreateSolutionUseCase) {
    if (!data.challengeSlug) throw new BadRequestError('Challenge slug is required');

    const user = await this.userService.getUserProfile(data.userId);
    if (!user) throw new NotFoundError('User');

    const challenge = await this.challengeService.getChallengeBySlug(data.challengeSlug);
    if (!challenge) throw new NotFoundError('Challenge');

    const existingSubmission = await this.solutionService.getUserChallengeSolution(data.userId, challenge.id);
    if (existingSubmission) throw new BadRequestError('You have already submitted this challenge');

    // Create solution
    await this.solutionService.createSolution({ ...data, challengeId: challenge.id });

    const currentPoints = POINTS_SYSTEM.COMPLETION.CHALLENGE[challenge.difficulty];

    await this.userService.updateUserPoints(data.userId, 'COMPLETION', currentPoints);

    await this.challengeService.incrementSubmissionCount(challenge.id);

    await this.emailService.sendSubmittedChallengeSolutionEmail(user.email, challenge.title);
  }
}
