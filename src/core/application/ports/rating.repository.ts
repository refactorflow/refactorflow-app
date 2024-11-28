import { Rating } from '@/core/domain/entities/rating.entity';

export interface RatingRepository {
  createRating(rating: Omit<Rating, 'id' | 'createdAt' | 'updatedAt'>): Promise<Rating>;
  getRatingById(id: string): Promise<Rating | null>;
  getRatingsByChallenge(challengeId: string): Promise<Rating[]>;
  getRatingByUserAndChallenge(userId: string, challengeId: string): Promise<Rating | null>;
  updateRating(id: string, data: Partial<Rating>): Promise<Rating>;
  deleteRating(id: string): Promise<void>;
}
