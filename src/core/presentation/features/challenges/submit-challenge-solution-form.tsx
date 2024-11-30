'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { submitChallengeSolutionAction } from '@/core/presentation/actions/submit-challenge-solution.action';
import { ButtonSubmit } from '@/core/presentation/components/common/ui/button-submit';
import { Form } from '@/core/presentation/components/common/ui/form';
import { InputForm } from '@/core/presentation/components/common/ui/input-form';
import { TextAreaForm } from '@/core/presentation/components/common/ui/textarea-form';

import { SubmitChallengeSolutionSchema } from './submit-challenge-solution-schema';

type SubmitChallengeSolutionFormProps = {
  challengeSlug: string;
};

export const SubmitChallengeSolutionForm = ({ challengeSlug }: SubmitChallengeSolutionFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof SubmitChallengeSolutionSchema>>({
    resolver: zodResolver(SubmitChallengeSolutionSchema),
    defaultValues: {
      title: '',
      repositoryUrl: '',
      description: '',
      implementationDetails: '',
    },
  });

  function handleSubmit(values: z.infer<typeof SubmitChallengeSolutionSchema>) {
    startTransition(async () => {
      const payload = await submitChallengeSolutionAction({
        ...values,
        challengeSlug,
      });

      if (payload?.serverError) {
        setErrorMessage(payload.serverError);
      }

      setSuccessMessage('Solution submitted successfully');
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputForm control={form.control} label="Title" name="title" placeholder="Enter title" />
        <InputForm
          control={form.control}
          label="Repository URL"
          name="repositoryUrl"
          placeholder="Enter repository URL"
        />
        <TextAreaForm control={form.control} label="Description" name="description" placeholder="Enter description" />
        <TextAreaForm
          control={form.control}
          label="Implementation Details"
          name="implementationDetails"
          placeholder="Enter implementation details"
        />

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <ButtonSubmit isPending={isPending}>Submit Solution</ButtonSubmit>
      </form>
    </Form>
  );
};
