import type { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/core/presentation/components/common/ui/button';

type UserProps = {
  user: User;
};

export const UserProfile = ({ user }: UserProps) => {
  return (
    <div>
      <p>{user?.name}</p>
      <>{user.image ? <Image src={user.image} width={100} height={100} alt={`avatar-${user.name}`} /> : <p></p>} </>
      <p>{user?.email}</p>
      {user.bio ? <p>{user.bio}</p> : <p>Vous n&apos;avez pas encore rempli votre bio</p>}

      <Link
        href={{
          pathname: '/profile/edit',
          query: {
            id: user.id,
            username: user.name,
            email: user.email,
            bio: user.bio || '',
            avatar: user.image || '',
          },
        }}
      >
        <Button>Modifier mon profil</Button>
      </Link>
    </div>
  );
};
