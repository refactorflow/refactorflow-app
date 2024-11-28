import type { PropsWithChildren } from 'react';

import { SidebarProvider, SidebarTrigger } from '@/core/presentation/components/common/ui/sidebar';
import { AdminSidebar } from '@/core/presentation/features/admin-dashboard/components/admin-dashboard-sidebar';

export default function AdminDashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  );
}
