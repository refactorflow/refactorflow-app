import { auth } from '@/config/server/auth';
import { container } from '@/core/infrastructure/config/container';

export default async function ProfilePage() {
  const session = await auth();
  const user = await container.getUserService().getUserProfile(session?.user.id!);

  console.log(user);

  return <div>Profile</div>;
}
