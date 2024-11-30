import { Challenge } from '@/core/domain/entities/challenge.entity';

export interface ChallengeRepository {
  createChallenge(
    challenge: Omit<Challenge, 'id' | 'createdAt' | 'updatedAt' | 'submissionCount' | 'averageRating' | 'slug'>,
  ): Promise<Challenge>;
  getChallengeById(id: string): Promise<Challenge | null>;
  getChallengeBySlug(slug: string): Promise<Challenge | null>;
  getAllChallenges(filters?: {
    difficulty?: Challenge['difficulty'];
    category?: Challenge['category']['main'];
    tags?: string[];
  }): Promise<Challenge[]>;
  updateChallenge(id: string, data: Partial<Challenge>): Promise<Challenge>;
  deleteChallenge(id: string): Promise<void>;
  updateSubmissionCount(id: string): Promise<void>;
  updateAverageRating(id: string): Promise<void>;

  startChallenge(userId: string, challengeId: string): Promise<void>;
  getStartedChallenges(userId: string): Promise<Challenge[]>;
  isStartedByUser(userId: string, challengeId: string): Promise<boolean>;
}
