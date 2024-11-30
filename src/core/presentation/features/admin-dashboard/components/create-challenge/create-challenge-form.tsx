'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ButtonSubmit } from '@/core/presentation/components/common/ui/button-submit';
import { InputForm } from '@/core/presentation/components/common/ui/input-form';
import MultipleSelectorForm from '@/core/presentation/components/common/ui/multiple-selector-form';
import { SelectForm } from '@/core/presentation/components/common/ui/select-form';
import { TextAreaForm } from '@/core/presentation/components/common/ui/textarea-form';

import { formCreateChallengeSchema } from './create-challenge-schema';

export const CreateChallengeForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const multipleSelectorOptions = [
    { label: 'Node.js', value: 'Node.js' },
    { label: 'Express', value: 'Express' },
  ];

  const form = useForm<z.infer<typeof formCreateChallengeSchema>>({
    resolver: zodResolver(formCreateChallengeSchema),
    defaultValues: {
      title: '',
      description: '',
      difficulty: 'BEGINNER',
      category: {
        main: 'FRONTEND',
        subCategory: [{ label: 'Express', value: 'Express' }],
      },
      starterCodeUrl: '',
      // requirements: {
      //   functional: [],
      //   technical: [],
      // },
    },
  });

  function onSubmit(values: z.infer<typeof formCreateChallengeSchema>) {
    startTransition(async () => {
      // const payload = await actionExample({ ...values, challengeId: '123', authorId: '456' });
      // if (payload?.serverError) {
      //   setErrorMessage(payload.serverError);
      // }

      console.log(values);
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-w-5xl flex-col space-y-8">
        <div className="flex flex-col gap-8">
          <InputForm
            control={form.control}
            name="title"
            label="Titre du challenge"
            placeholder="Titre du challenge"
            className="flex-1"
          />
          <TextAreaForm
            control={form.control}
            name="description"
            label="Description"
            placeholder="Description"
            className="flex-1"
          />
          <SelectForm
            control={form.control}
            name="category.main"
            label="Catégorie"
            items={['FRONTEND', 'BACKEND', 'FULLSTACK']}
            placeholder="Catégorie"
          />
          <MultipleSelectorForm
            control={form.control}
            name="category.subCategory"
            label="Sous-catégorie"
            options={multipleSelectorOptions}
            placeholder="Sous-catégorie"
          />
          <InputForm
            control={form.control}
            name="starterCodeUrl"
            label="URL du code de départ"
            placeholder="URL du code de départ"
          />
        </div>

        {/* <div className="flex flex-col gap-8 sm:flex-row">
          <div className="flex flex-1 flex-col gap-8">
            <InputForm
              control={form.control}
              name="title"
              label="Titre du challenge"
              placeholder="Titre du challenge"
            />
            <TextAreaForm control={form.control} name="description" label="Description" placeholder="Description" />
            <SelectForm
              control={form.control}
              name="category"
              label="Catégorie"
              items={['FRONTEND', 'BACKEND', 'FULLSTACK']}
              placeholder="Catégorie"
            />

            <InputForm
              control={form.control}
              name="category.subCategory"
              label="Sous-catégorie"
              placeholder="Sous-catégorie"
            />
          </div>

          <div className="flex flex-1 flex-col gap-8">
            <SelectForm
              control={form.control}
              name="difficulty"
              label="Difficulté"
              items={['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']}
              placeholder="Difficulté"
            />
            <InputForm
              control={form.control}
              name="starterCodeUrl"
              label="URL du code de départ"
              placeholder="URL du code de départ"
            />

            <InputForm
              control={form.control}
              name="requirements.functional"
              label="Exigences fonctionnelles"
              placeholder="Exigences fonctionnelles"
            />

            <InputForm
              control={form.control}
              name="requirements.technical"
              label="Exigences techniques"
              placeholder="Exigences techniques"
            />

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
          </div>
        </div> */}
        <div className="flex justify-center py-8">
          <ButtonSubmit isPending={isPending} className="w-full">
            Envoyer
          </ButtonSubmit>
        </div>
      </form>
    </FormProvider>
  );
};