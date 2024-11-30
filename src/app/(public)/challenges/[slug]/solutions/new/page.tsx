import { SubmitChallengeSolutionForm } from '@/core/presentation/features/challenges/submit-challenge-solution-form';

export default async function ChallengeSolutionsNewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div>
      <SubmitChallengeSolutionForm challengeSlug={slug} />
    </div>
  );
}
