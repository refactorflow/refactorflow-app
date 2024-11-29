import { dashboardTitle } from '@/core/presentation/components/common/ui/dashboard-title';
import { FormCreateChallenge } from '@/core/presentation/features/admin-dashboard/components/create-challenge';
const CreateChallenge = () => {
  return (
    <div className="flex flex-col gap-8 py-1">
      {dashboardTitle({ title: 'Créer un challenge' })}
      <FormCreateChallenge />
    </div>
  );
};

export default CreateChallenge;
