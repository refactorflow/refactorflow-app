import { PointCategory } from '@/core/domain/constants/points.constant';
import { User } from '@/core/domain/entities/user.entity';

export interface UserRepository {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  updateUserPoints(id: string, type: PointCategory, value: number): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
