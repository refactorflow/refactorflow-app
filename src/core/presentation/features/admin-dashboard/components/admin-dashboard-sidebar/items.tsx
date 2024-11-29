import { Plus, Swords } from 'lucide-react';

import { URL } from '@/config/constants/url.constant';
import { LogoutButton } from '@/core/presentation/features/authentication/logout-button';

export const challengesNavigationItems = [
  {
    title: 'All Challenges',
    url: '#',
    icon: Swords,
  },
  {
    title: 'Create Challenge',
    url: URL.CREATECHALLENGE,
    icon: Plus,
  },
];

export const sidebarFooterDropdownItems = [
  {
    label: 'Sign out',
    component: <LogoutButton variant="link" size="sm" className="w-full justify-start" />,
  },
];
