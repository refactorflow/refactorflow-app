import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/core/presentation/components/common/ui/sidebar';

import { navigationItems } from './sidebar-navigation-items';

export const SidebarNavigation = () => {
  return (
    <SidebarMenu>
      {navigationItems.map(item => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <a href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
