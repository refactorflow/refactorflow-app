import { Plus, Swords } from 'lucide-react';

import { LogoutButton } from '@/core/presentation/features/authentication/logout-button';

export const challengesNavigationItems = [
  {
    title: 'All Challenges',
    url: '#',
    icon: Swords,
  },
  {
    title: 'Create Challenge',
    url: '#',
    icon: Plus,
  },
];

export const sidebarFooterDropdownItems = [
  {
    label: 'Sign out',
    component: <LogoutButton variant="link" size="sm" className="w-full justify-start" />,
  },
];
