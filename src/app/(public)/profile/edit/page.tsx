import { PageTitle } from '@/core/presentation/components/common/ui/page-title';
import { EditProfile } from '@/core/presentation/features/user/components/edit-profile';

export default function ProfileEditPage() {
  return (
    <div>
      <PageTitle title="Edit Profile" />
      <EditProfile />
    </div>
  );
}
