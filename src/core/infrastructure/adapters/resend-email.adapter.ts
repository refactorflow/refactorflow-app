import { resend } from '@/config/libs/resend';
import { EmailRepository } from '@/core/application/ports/email.repository';

export type EmailResponse = {
  success: boolean;
  message: string;
};

export class ResendEmailAdapter implements EmailRepository {
  async sendStartedChallengeEmail(email: string) {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'refactorflow@gmail.com',
      subject: 'You have started a challenge',
      text: 'You have started a challenge',
    });
  }
}
