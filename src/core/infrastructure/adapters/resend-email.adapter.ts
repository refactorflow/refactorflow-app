import { env } from '@/config/env';
import { resend } from '@/config/libs/resend';
import { EmailSendingError } from '@/core/application/errors/custom.error';
import { EmailRepository } from '@/core/application/ports/email.repository';
import { Challenge } from '@/core/domain/entities/challenge.entity';

export type EmailResponse = {
  success: boolean;
  message: string;
};

export class ResendEmailAdapter implements EmailRepository {
  async sendStartedChallengeEmail(email: string) {
    const payload = await resend.emails.send({
      from: env.RESEND_EMAIL_SENDER,
      to: email,
      subject: 'You have started a challenge',
      text: 'You have started a challenge',
    });

    if (payload.error) {
      throw new EmailSendingError('Error sending email, but the challenge was started');
    }
  }

  async sendSubmittedChallengeSolutionEmail(email: string, challenge: Challenge) {
    const payload = await resend.emails.send({
      from: env.RESEND_EMAIL_SENDER,
      to: email,
      subject: 'You have submitted a challenge',
      text: `You have submitted a ${challenge.title} challenge`,
    });

    if (payload.error) {
      throw new EmailSendingError('Error sending email, but the challenge was submitted');
    }
  }
}
