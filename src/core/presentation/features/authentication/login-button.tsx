'use client';
import { signIn } from 'next-auth/react';

import { Button, ButtonProps } from '@/core/presentation/components/common/ui/button';

interface LoginButtonProps extends ButtonProps {
  oauthProvider: 'google' | 'github';
  children: React.ReactNode;
}

export const LoginButton = ({ oauthProvider, children, ...props }: LoginButtonProps) => {
  return (
    <Button onClick={() => signIn(oauthProvider)} {...props}>
      {children}
    </Button>
  );
};
