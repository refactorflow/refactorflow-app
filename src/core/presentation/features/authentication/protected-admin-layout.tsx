import { redirect } from 'next/navigation';
import type { PropsWithChildren } from 'react';

import { URL } from '@/config/constants/url.constant';
import { auth } from '@/config/server/auth';

export default async function ProtectedAdminLayout({ children }: PropsWithChildren) {
  const session = await auth();

  if (session && session.user.role !== 'ADMIN') {
    redirect(URL.HOME);
  }

  return <div>{children}</div>;
}
