import { Challenge } from '@/core/domain/entities/challenge.entity';

export interface EmailRepository {
  sendStartedChallengeEmail(email: string): Promise<void>;
  sendSubmittedChallengeSolutionEmail(email: string, challenge: Challenge): Promise<void>;
}
