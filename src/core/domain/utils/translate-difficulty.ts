export const translateDifficulty = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'beginner': {
      return { label: 'Débutant', stars: 1 };
    }
    case 'intermediate': {
      return { label: 'Intermédiaire', stars: 2 };
    }
    case 'advanced': {
      return { label: 'Avancé', stars: 3 };
    }
    case 'expert': {
      return { label: 'Expert', stars: 4 };
    }
    default: {
      return { label: 'Inconnu', stars: 0 };
    }
  }
};
