import { auth } from '@/config/server/auth';
import { container } from '@/core/infrastructure/config/container';
import { AuthButton } from '@/core/presentation/features/authentication/auth-button';

export default async function HomePage() {
  const session = await auth();

  const challenges = await container.getChallengeService().getAllChallenges();

  return (
    <div>
      {session && <div>Logged in as {session.user?.name}</div>}

      <AuthButton session={session} oauthProvider="github">
        Login with GitHub
      </AuthButton>
    </div>
  );
}
