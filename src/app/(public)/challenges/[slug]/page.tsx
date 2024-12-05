import { auth } from '@/config/server/auth';
import { container } from '@/core/infrastructure/config/container';
import { ChallengeDetails } from '@/core/presentation/features/challenges/challenge-details';
import { StartChallengeButton } from '@/core/presentation/features/challenges/start-challenge-button';

export default async function ChallengePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();
  const challenge = await container.getChallengeService().getChallengeBySlug(slug);
  const isStarted = await container.getChallengeService().isStartedByUser(challenge.id, session?.user.id);

  return (
    <div className="flex flex-col gap-4">
      <ChallengeDetails challenge={challenge} />
      <StartChallengeButton isStarted={isStarted} challenge={challenge} />
    </div>
  );
}
