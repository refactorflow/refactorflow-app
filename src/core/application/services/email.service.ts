import { EmailRepository } from '@/core/application/ports/email.repository';

export class EmailService {
  constructor(private readonly emailRepository: EmailRepository) {}

  async sendStartedChallengeEmail(email: string) {
    await this.emailRepository.sendStartedChallengeEmail(email);
  }
}
