import { container } from '@/core/infrastructure/config/container';
import { ChallengeCard } from '@/core/presentation/features/challenges/challenge-card';

export default async function ChallengesPage() {
  const challenges = await container.getChallengeService().getAllChallenges();

  return (
    <div>
      {challenges.map(challenge => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
}
