import { redirect } from 'next/navigation';
import type { PropsWithChildren } from 'react';

import { URL } from '@/config/constants/url.constant';
import { auth } from '@/config/server/auth';

export default async function ProtectedAuthenticationLayout({ children }: PropsWithChildren) {
  const session = await auth();

  if (!session) {
    redirect(URL.HOME);
  }

  return <div>{children}</div>;
}
