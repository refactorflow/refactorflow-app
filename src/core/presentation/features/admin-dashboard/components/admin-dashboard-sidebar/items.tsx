import { Plus, Swords } from 'lucide-react';

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

import { Button } from '@/core/presentation/components/common/ui/button';

export const sidebarFooterDropdownItems = [
  {
    label: 'Sign out',
    component: (
      <Button variant="link" size="sm" className="w-full justify-start">
        Sign out
      </Button>
    ),
  },
];
