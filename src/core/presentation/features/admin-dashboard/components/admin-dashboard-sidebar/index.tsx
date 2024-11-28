import { ChevronDown, ChevronUp, User2 } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/core/presentation/components/common/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/presentation/components/common/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/core/presentation/components/common/ui/sidebar';

import { challengesNavigationItems, sidebarFooterDropdownItems } from './items';

export function AdminSidebar() {
  return (
    <Sidebar>
      {/* Main Content Section */}
      <SidebarContent>
        <SidebarGroup>
          {/* Logo/Brand Section */}
          <SidebarGroupLabel className="text-base font-bold tracking-tighter text-slate-950">
            RefactorFlow
          </SidebarGroupLabel>

          {/* Collapsible Navigation Section */}
          <Collapsible defaultOpen={true} className="group/collapsible">
            <SidebarGroup>
              {/* Challenges Section Header */}
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="font-bold text-slate-950 [&]:text-sm">
                  Challenges
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              {/* Challenges Navigation Menu */}
              <CollapsibleContent>
                <SidebarMenu>
                  {challengesNavigationItems.map(item => (
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
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer User Menu Section */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* User Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="[&]:text-slate-950">
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              {/* User Dropdown Content */}
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                {sidebarFooterDropdownItems.map(item => (
                  <DropdownMenuItem key={item.label}>{item.component}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
