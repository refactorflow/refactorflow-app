'use client';

import Link from 'next/link';
import { Fragment, useState, useTransition } from 'react';

import { URL } from '@/config/constants/url.constant';
import { ChallengeResponseDTO } from '@/core/application/dtos/challenge.dto';
import { startChallengeAction } from '@/core/presentation/actions/start-challenge.action';
import { Button } from '@/core/presentation/components/common/ui/button';
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
      {isStarted ? (
        <Button>
          <Link href={URL.CHALLENGE_HUB(challenge.slug)}>Voir le hub du challenge</Link>
        </Button>
      ) : (
        <ButtonSubmit isPending={isPending} onClick={handleStartChallenge}>
          Commencez le challenge
        </ButtonSubmit>
      )}

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </Fragment>
  );
};
