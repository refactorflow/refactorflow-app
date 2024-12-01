import { UpdateUserDTO, UserResponseDTO } from '@/core/application/dtos/user.dto';
import { BadRequestError, NotFoundError } from '@/core/application/errors/custom.error';
import { UserRepository } from '@/core/application/ports/user.repository';
import { PointCategory } from '@/core/domain/constants/points.constant';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserProfile(userId: string): Promise<UserResponseDTO> {
    try {
      const user = await this.userRepository.getUserById(userId);
      if (!user) throw new NotFoundError('User');

      return UserResponseDTO.parse(user);
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new BadRequestError('Error fetching user profile', { error });
    }
  }

  async updateUserProfile(userId: string, updateData: UpdateUserDTO): Promise<UserResponseDTO> {
    try {
      const user = await this.userRepository.getUserById(userId);
      if (!user) throw new NotFoundError('User');

      const validatedData = UpdateUserDTO.parse(updateData);
      const updatedUser = await this.userRepository.updateUser(userId, validatedData);

      return UserResponseDTO.parse(updatedUser);
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new BadRequestError('Error updating user profile', { error });
    }
  }

  async updateUserPoints(userId: string, type: PointCategory, value: number): Promise<UserResponseDTO> {
    try {
      const updatedUser = await this.userRepository.updateUserPoints(userId, type, value);

      return UserResponseDTO.parse(updatedUser);
    } catch (error) {
      throw new BadRequestError('Error updating user points', { error });
    }
  }

  async deleteUserAccount(userId: string): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundError('User');
    }

    await this.userRepository.deleteUser(userId);
  }

  async getUserCompletedChallenges(userId: string): Promise<string[]> {
    try {
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        throw new NotFoundError('User');
      }

      return UserResponseDTO.pick({ completedChallengeIds: true }).parse(user).completedChallengeIds;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError('Error fetching user challenges', { error });
    }
  }

  async getUserSubmissions(userId: string): Promise<string[]> {
    try {
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        throw new NotFoundError('User');
      }

      return UserResponseDTO.pick({ solutionIds: true }).parse(user).solutionIds;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError('Error fetching user submissions', { error });
    }
  }
}
