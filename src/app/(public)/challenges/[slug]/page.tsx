import { container } from '@/core/infrastructure/config/container';

export default async function ChallengePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const challenge = await container.getChallengeService().getChallengeBySlug(slug);

  console.log(challenge);

  return <div>ChallengePage</div>;
}
