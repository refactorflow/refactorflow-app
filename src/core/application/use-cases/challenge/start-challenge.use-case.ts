import { BadRequestError } from '@/core/application/errors/custom.error';
import { ChallengeService } from '@/core/application/services/challenge.service';
import { EmailService } from '@/core/application/services/email.service';

export class StartChallengeUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly challengeService: ChallengeService,
  ) {}

  async execute(userId: string, challengeId: string, email: string) {
    try {
      await this.challengeService.startChallenge(challengeId, userId);
      await this.emailService.sendStartedChallengeEmail(email);
    } catch (error) {
      throw new BadRequestError('Error starting challenge', { error });
    }
  }
}
