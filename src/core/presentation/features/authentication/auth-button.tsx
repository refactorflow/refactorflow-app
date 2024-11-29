'use client';
import type { Session } from 'next-auth';

import { ButtonProps } from '@/core/presentation/components/common/ui/button';
import { LoginButton } from '@/core/presentation/features/authentication/login-button';
import { LogoutButton } from '@/core/presentation/features/authentication/logout-button';

interface AuthButtonProps extends ButtonProps {
  session: Session | null;
  children: React.ReactNode;
  oauthProvider: 'google' | 'github';
}

export const AuthButton = ({ session, children, oauthProvider, ...props }: AuthButtonProps) => {
  return session ? (
    <LogoutButton {...props} />
  ) : (
    <LoginButton oauthProvider={oauthProvider} {...props}>
      {children}
    </LoginButton>
  );
};
