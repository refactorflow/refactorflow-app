import { BadRequestError } from '@/core/application/errors/custom.error';
import { EmailRepository } from '@/core/application/ports/email.repository';

export class EmailService {
  constructor(private readonly emailRepository: EmailRepository) {}

  async sendStartedChallengeEmail(email: string) {
    try {
      await this.emailRepository.sendStartedChallengeEmail(email);
    } catch (error) {
      throw new BadRequestError('Error sending started challenge email', { error });
    }
  }
}
