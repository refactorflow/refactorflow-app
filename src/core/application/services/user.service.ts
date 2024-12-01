import { UpdateUserDTO, UserResponseDTO } from '@/core/application/dtos/user.dto';
import { BadRequestError, NotFoundError } from '@/core/application/errors/custom.error';
import { UserRepository } from '@/core/application/ports/user.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserProfile(userId: string): Promise<UserResponseDTO> {
    try {
      const user = await this.userRepository.getUserById(userId);
      if (!user) throw new NotFoundError('User');

      return UserResponseDTO.parse({
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role,
        solutionIds: user.solutionIds,
        commentsIds: user.commentsIds,
        ratingsIds: user.ratingsIds,
        completedChallengeIds: user.completedChallengeIds,
        startedChallengeIds: user.startedChallengeIds,
      });
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new BadRequestError('Error fetching user profile', { error });
    }
  }

  async updateUserProfile(userId: string, updateData: UpdateUserDTO): Promise<UserResponseDTO> {
    try {
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        throw new NotFoundError('User');
      }

      const validatedData = UpdateUserDTO.parse(updateData);
      const updatedUser = await this.userRepository.updateUser(userId, validatedData);
      return UserResponseDTO.parse(updatedUser);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError('Error updating user profile', { error });
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
