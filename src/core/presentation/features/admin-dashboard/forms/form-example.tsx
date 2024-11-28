'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { Form, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ButtonSubmit } from '@/core/presentation/components/common/ui/button-submit';
import { InputForm } from '@/core/presentation/components/common/ui/input-form';

import { actionExample } from '../actions/action-example.action';
import { formExampleSchema } from './form-example-schema';

export const FormExample = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formExampleSchema>>({
    resolver: zodResolver(formExampleSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formExampleSchema>) {
    startTransition(async () => {
      const payload = await actionExample({ ...values, challengeId: '123' });

      if (payload?.serverError) {
        setErrorMessage(payload.serverError);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputForm control={form.control} name="name" label="Name" />

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <ButtonSubmit isPending={isPending}>Submit</ButtonSubmit>
      </form>
    </Form>
  );
};
