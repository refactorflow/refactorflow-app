'use client';

import { Fragment, useState, useTransition } from 'react';

import { ChallengeResponseDTO } from '@/core/application/dtos/challenge.dto';
import { startChallengeAction } from '@/core/presentation/actions/start-challenge.action';
import { ButtonSubmit } from '@/core/presentation/components/common/ui/button-submit';

type StartChallengeButtonProps = {
  challenge: ChallengeResponseDTO;
  isStarted: boolean;
};

export const StartChallengeButton = ({ challenge, isStarted }: StartChallengeButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  function handleStartChallenge() {
    startTransition(async () => {
      const payload = await startChallengeAction({
        challengeId: challenge.id,
        challengeSlug: challenge.slug,
      });

      if (payload?.serverError || payload?.data?.errorMessage) {
        setErrorMessage(payload.serverError || payload.data?.errorMessage);
      }
    });
  }

  return (
    <Fragment>
      <ButtonSubmit isPending={isPending} onClick={handleStartChallenge}>
        {isStarted ? 'Visit Challenge Hub' : 'Start Challenge'}
      </ButtonSubmit>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </Fragment>
  );
};
