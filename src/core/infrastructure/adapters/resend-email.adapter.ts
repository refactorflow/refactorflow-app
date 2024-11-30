import { resend } from '@/config/libs/resend';
import { EmailSendingError } from '@/core/application/errors/custom.error';
import { EmailRepository } from '@/core/application/ports/email.repository';

export type EmailResponse = {
  success: boolean;
  message: string;
};

export class ResendEmailAdapter implements EmailRepository {
  async sendStartedChallengeEmail(email: string) {
    const payload = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'You have started a challenge',
      text: 'You have started a challenge',
    });

    if (payload.error) {
      throw new EmailSendingError('Error sending email, but the challenge was started');
    }
  }
}
