export interface EmailRepository {
  sendStartedChallengeEmail(email: string): Promise<void>;
  sendSubmittedChallengeSolutionEmail(email: string, challengeTitle: string): Promise<void>;
}
