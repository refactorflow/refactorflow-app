import type { PropsWithChildren } from 'react';

import ProtectedAuthenticationLayout from '@/core/presentation/features/authentication/protected-user-layout';

export default function ProfileLayout({ children }: PropsWithChildren) {
  return <ProtectedAuthenticationLayout>{children}</ProtectedAuthenticationLayout>;
}
