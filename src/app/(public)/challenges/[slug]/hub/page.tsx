import Link from 'next/link';

import { URL } from '@/config/constants/url.constant';
import { container } from '@/core/infrastructure/config/container';
import { Button } from '@/core/presentation/components/common/ui/button';
import { ChallengeDetails } from '@/core/presentation/features/challenges/challenge-details';
import { ChallengeStarterCodeUrl } from '@/core/presentation/features/challenges/challenge-starter-code-url';

export default async function ChallengeHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const challenge = await container.getChallengeService().getChallengeBySlug(slug);

  console.log(challenge);

  return (
    <div className="flex flex-col gap-4">
      <ChallengeDetails challenge={challenge} />
      <ChallengeStarterCodeUrl starterCodeUrl={challenge.starterCodeUrl} />
      <Button>
        <Link href={URL.CHALLENGE_NEW_SOLUTION(slug)}>Soumettre votre solution</Link>
      </Button>
    </div>
  );
}
