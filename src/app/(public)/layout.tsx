import type { PropsWithChildren } from 'react';

export default function PublicLayout({ children }: PropsWithChildren) {
  return <div className="flex min-h-screen flex-col items-center justify-center">{children}</div>;
}
