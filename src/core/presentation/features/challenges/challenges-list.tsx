import { container } from '@/core/infrastructure/config/container';

import { ChallengeCard } from './challenge-card';

export const ChallengesList = async () => {
  const challenges = await container.getChallengeService().getAllChallenges();

  return (
    <section aria-label="Liste des challenges">
      <h2 className="sr-only">Challenges disponibles</h2>
      <ul
        role="list"
        aria-label="Liste des challenges de programmation"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {challenges.map(challenge => (
          <li key={challenge.id} aria-labelledby={`challenge-${challenge.id}`}>
            <ChallengeCard challenge={challenge} />
          </li>
        ))}
      </ul>
    </section>
  );
};
