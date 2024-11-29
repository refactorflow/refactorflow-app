'use client';
import { signOut } from 'next-auth/react';

import { Button, ButtonProps } from '@/core/presentation/components/common/ui/button';

interface LogoutButtonProps extends ButtonProps {}

export const LogoutButton = ({ ...props }: LogoutButtonProps) => {
  return (
    <Button onClick={() => signOut()} {...props}>
      Logout
    </Button>
  );
};
