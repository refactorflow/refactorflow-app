import { UpdateUserDTO, UserResponseDTO } from '@/core/application/dtos/user.dto';
import { BadRequestError, NotFoundError } from '@/core/application/errors/custom.error';
import { UserRepository } from '@/core/application/ports/user.repository';

export class UserService {
  constructor(private readonly authRepository: UserRepository) {}

  async getUserProfile(userId: string): Promise<UserResponseDTO> {
    try {
      const user = await this.authRepository.getUserById(userId);

      if (!user) {
        throw new NotFoundError('User');
      }

      return UserResponseDTO.parse(user);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError('Error fetching user profile', { error });
    }
  }

  async updateUserProfile(userId: string, updateData: UpdateUserDTO): Promise<UserResponseDTO> {
    try {
      const user = await this.authRepository.getUserById(userId);
      if (!user) {
        throw new NotFoundError('User');
      }

      const validatedData = UpdateUserDTO.parse(updateData);
      const updatedUser = await this.authRepository.updateUser(userId, validatedData);
      return UserResponseDTO.parse(updatedUser);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError('Error updating user profile', { error });
    }
  }

  async deleteUserAccount(userId: string): Promise<void> {
    const user = await this.authRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundError('User');
    }

    await this.authRepository.deleteUser(userId);
  }

  async getUserCompletedChallenges(userId: string): Promise<string[]> {
    try {
      const user = await this.authRepository.getUserById(userId);
      if (!user) {
        throw new NotFoundError('User');
      }

      return UserResponseDTO.pick({ completedChallenges: true }).parse(user).completedChallenges;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError('Error fetching user challenges', { error });
    }
  }

  async getUserSubmissions(userId: string): Promise<string[]> {
    try {
      const user = await this.authRepository.getUserById(userId);
      if (!user) {
        throw new NotFoundError('User');
      }

      return UserResponseDTO.pick({ submissions: true }).parse(user).submissions;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError('Error fetching user submissions', { error });
    }
  }
}
