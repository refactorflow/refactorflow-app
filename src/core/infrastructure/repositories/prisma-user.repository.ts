import { PrismaClient } from '@prisma/client';

import { UserRepository } from '@/core/application/ports/user.repository';
import { User } from '@/core/domain/entities/user.entity';

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        completedChallenges: true,
        solutions: true,
      },
    });

    return user ? this.mapToDomain(user) : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        completedChallenges: true,
        solutions: true,
      },
    });

    return user ? this.mapToDomain(user) : null;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.username,
        bio: data.bio,
        image: data.avatar,
      },
      include: {
        completedChallenges: true,
        solutions: true,
      },
    });

    return this.mapToDomain(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaUser: any): User {
    return new User(
      prismaUser.id,
      prismaUser.name || '',
      prismaUser.email || '',
      prismaUser.createdAt,
      prismaUser.updatedAt,
      prismaUser.completedChallenges.map((c: any) => c.id),
      prismaUser.submissions.map((s: any) => s.id),
      prismaUser.image,
      prismaUser.bio,
    );
  }
}
