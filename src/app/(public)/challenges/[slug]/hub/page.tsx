import Link from 'next/link';

import { URL } from '@/config/constants/url.constant';
import { Button } from '@/core/presentation/components/common/ui/button';

export default async function ChallengeHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <Button>
      <Link href={URL.CHALLENGE_NEW_SOLUTION(slug)}>Submit Solution</Link>
    </Button>
  );
}
