import { PrismaClient } from '@prisma/client';

import { UserRepository } from '@/core/application/ports/user.repository';
import { User } from '@/core/domain/entities/user.entity';

import { UserMapper } from '../mappers/user.mapper';

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { solutions: true, completedChallenges: true },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { completedChallenges: true, solutions: true },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: UserMapper.toPrisma(data),
      include: { completedChallenges: true, solutions: true },
    });

    return UserMapper.toDomain(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
