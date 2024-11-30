import { auth } from '@/config/server/auth';
import { AuthButton } from '@/core/presentation/features/authentication/auth-button';

export default async function HomePage() {
  const session = await auth();

  console.log(session?.user?.name);

  return (
    <div>
      {session && <div>Logged in as {session.user?.name}</div>}

      <AuthButton session={session} oauthProvider="github">
        Login with GitHub
      </AuthButton>
    </div>
  );
}
