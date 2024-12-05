import { auth } from '@/config/server/auth';
import { db } from '@/config/server/db';
import { PageTitle } from '@/core/presentation/components/common/ui/page-title';
import { UserProfile } from '@/core/presentation/features/user/components/user-profile';

export default async function ProfilePage() {
  const session = await auth();
  // const user = await container.getUserService().getUserProfile(session?.user.id!);

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  if (!user) return <p>User not found</p>;

  return (
    <div>
      <PageTitle title="Profile" />
      <UserProfile user={user} />
    </div>
  );
}
