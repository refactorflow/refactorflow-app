import { CategoryMain, Difficulty } from '@prisma/client';

export const challengesMOCK = [
  {
    title: 'Todo App avec React',
    description: 'Créer une application de todo list avec React et TypeScript',
    difficulty: Difficulty.BEGINNER,
    categoryMain: CategoryMain.FRONTEND,
    subCategories: ['React', 'TypeScript'],
    starterCodeUrl: 'https://github.com/starter/todo-app',
    requirements: {
      functional: ['Ajouter/Supprimer des todos', 'Marquer comme complété'],
      technical: ['Utiliser TypeScript', 'Implémenter des tests unitaires'],
    },
    expectedOutput: {
      screenshots: ['todo-app-preview.png'],
    },
    authorId: 'default-author-id', // À remplacer avec un vrai ID
  },
  {
    title: 'API REST Node.js',
    description: 'Développer une API REST avec Node.js et Express',
    difficulty: Difficulty.INTERMEDIATE,
    categoryMain: CategoryMain.BACKEND,
    subCategories: ['Node.js', 'Express'],
    starterCodeUrl: 'https://github.com/starter/rest-api',
    requirements: {
      functional: ['CRUD complet', 'Authentication JWT'],
      technical: ['Architecture MVC', 'Documentation Swagger'],
    },
    authorId: 'default-author-id', // À remplacer avec un vrai ID
  },
];
