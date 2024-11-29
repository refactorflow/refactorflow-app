import { CategoryMain, Difficulty } from '@prisma/client';

export const challengesMOCK = [
  {
    title: 'API REST Node.js',
    slug: 'api-rest-nodejs',
    description: 'Développer une API REST avec Node.js et Express',
    difficulty: Difficulty.INTERMEDIATE,
    categoryMain: CategoryMain.BACKEND,
    subCategories: ['Node.js', 'Express'], // ✅ Correction
    starterCodeUrl: 'https://github.com/starter/rest-api', // ✅ Correction
    requirements: {
      functional: ['CRUD complet', 'Authentication JWT'],
      technical: ['Architecture MVC', 'Documentation Swagger'],
    },
    authorId: 'default-author-id',
    submissionCount: 0, // ✅ Correction
    averageRating: 0,
  },
];
