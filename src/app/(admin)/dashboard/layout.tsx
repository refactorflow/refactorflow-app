import type { PropsWithChildren } from 'react';

import { SidebarProvider, SidebarTrigger } from '@/core/presentation/components/common/ui/sidebar';
import { AdminSidebar } from '@/core/presentation/features/admin-dashboard/components/admin-dashboard-sidebar';
import ProtectedAdminLayout from '@/core/presentation/features/authentication/protected-admin-layout';

export default function AdminDashboardLayout({ children }: PropsWithChildren) {
  return (
    <ProtectedAdminLayout>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </ProtectedAdminLayout>
  );
}
