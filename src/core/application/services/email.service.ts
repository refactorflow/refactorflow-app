import { EmailRepository } from '@/core/application/ports/email.repository';
import { Challenge } from '@/core/domain/entities/challenge.entity';

export class EmailService {
  constructor(private readonly emailRepository: EmailRepository) {}

  async sendStartedChallengeEmail(email: string) {
    await this.emailRepository.sendStartedChallengeEmail(email);
  }

  async sendSubmittedChallengeSolutionEmail(email: string, challenge: Challenge) {
    await this.emailRepository.sendSubmittedChallengeSolutionEmail(email, challenge);
  }
}
