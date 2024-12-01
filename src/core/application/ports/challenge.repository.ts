import { Challenge } from '@/core/domain/entities/challenge.entity';

type CreateChallenge = Partial<Challenge> & {
  title: string;
  description: string;
  difficulty: Challenge['difficulty'];
  categoryMain: Challenge['categoryMain'];
  subCategories: Challenge['subCategories'];
  starterCodeUrl: Challenge['starterCodeUrl'];
  authorId: Challenge['authorId'];
};

export interface ChallengeRepository {
  createChallenge(challenge: CreateChallenge): Promise<Challenge>;
  getChallengeById(id: string): Promise<Challenge | null>;
  getChallengeBySlug(slug: string): Promise<Challenge | null>;
  getAllChallenges(filters?: {
    difficulty?: Challenge['difficulty'];
    categoryMain?: Challenge['categoryMain'];
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
