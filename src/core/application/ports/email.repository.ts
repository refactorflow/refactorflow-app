export interface EmailRepository {
  sendStartedChallengeEmail(email: string): Promise<void>;
}
