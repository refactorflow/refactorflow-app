import { DashboardTitle } from '@/core/presentation/components/common/ui/dashboard-title';
import { CreateChallengeForm } from '@/core/presentation/features/admin-dashboard/components/create-challenge/create-challenge-form';

export default function CreateChallengePage() {
  return (
    <div className="space-y-8">
      <DashboardTitle title="Créer un challenge" />
      <CreateChallengeForm />
    </div>
  );
}
