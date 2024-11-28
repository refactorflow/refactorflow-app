import { Submission } from '@/core/domain/entities/submission.entity';

export interface SubmissionRepository {
  createSubmission(submission: Omit<Submission, 'id' | 'createdAt' | 'updatedAt' | 'comments'>): Promise<Submission>;
  getSubmissionById(id: string): Promise<Submission | null>;
  getSubmissionsByChallenge(challengeId: string): Promise<Submission[]>;
  getSubmissionsByUser(userId: string): Promise<Submission[]>;
  updateSubmission(id: string, data: Partial<Submission>): Promise<Submission>;
  deleteSubmission(id: string): Promise<void>;
  updateVotes(id: string, votes: Submission['votes']): Promise<void>;
}
