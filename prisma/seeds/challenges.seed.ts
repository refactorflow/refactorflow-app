import type { PrismaClient } from '@prisma/client';

import { challengesMOCK } from '../mocks/challenges.mock';

export async function seedChallenges(prisma: PrismaClient) {
  console.log('🌱 Seeding challenges...');

  for (const challenge of challengesMOCK) {
    await prisma.challenge.create({
      data: challenge,
    });
  }
}
