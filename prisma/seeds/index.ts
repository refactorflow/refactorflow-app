import { PrismaClient } from '@prisma/client';

import { seedChallenges } from './challenges.seed';
import type { SeedOptions } from './types';

const prisma = new PrismaClient();

const DEFAULT_OPTIONS: SeedOptions = { all: true };

async function main(options: SeedOptions = DEFAULT_OPTIONS) {
  try {
    if (options.all || options.challenges) await seedChallenges(prisma);
    // Ajoutez d'autres seeds selon vos besoins
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Récupérer les arguments de la ligne de commande
const args = process.argv.slice(2);
const options: SeedOptions = {
  // Ajoutez d'autres options selon vos besoins
  challenges: args.includes('--challenges'),
  all: args.includes('--all') || args.length === 0,
};

try {
  await main(options);
} catch (error) {
  console.error(error);
  throw error;
}
