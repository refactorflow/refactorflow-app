'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/core/presentation/components/common/ui/button';
import { InputForm } from '@/core/presentation/components/common/ui/input-form';
import { TextAreaForm } from '@/core/presentation/components/common/ui/textarea-form';
import { editProfileSchema } from '@/core/presentation/features/user/components/edit-profile-schema';

export const EditProfile = () => {
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: searchParams.get('username') || '',
      email: searchParams.get('email') || '',
      bio: searchParams.get('bio') || '',
      image: searchParams.get('image') || '',
    },
  });

  return (
    <FormProvider {...form}>
      <form className="flex max-w-5xl flex-col space-y-4">
        <InputForm label="Nom" name="name" control={form.control} />
        <InputForm label="Email" name="email" control={form.control} />
        <TextAreaForm label="Bio" name="bio" control={form.control} />
        <InputForm label="Image" name="image" control={form.control} />
        <Button type="submit">Sauvegarder</Button>
      </form>
    </FormProvider>
  );
};
