import Link from 'next/link';

import { ChallengeResponseDTO } from '@/core/application/dtos/challenge.dto';
import { Badge } from '@/core/presentation/components/common/ui/badge';
import { Button } from '@/core/presentation/components/common/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/core/presentation/components/common/ui/card';

type ChallengeCardProps = {
  challenge: ChallengeResponseDTO;
};

const ChallengeCardHeader = ({ challenge }: ChallengeCardProps) => {
  const { title, category, difficulty } = challenge;

  return (
    <CardHeader className="space-y-2">
      <CardTitle>{title}</CardTitle>

      <div className="flex flex-wrap gap-2">
        <Badge>{difficulty}</Badge>
        <Badge>{category.main}</Badge>
      </div>
    </CardHeader>
  );
};

const ChallengeCardDescription = ({ description }: { description: string }) => {
  return <p className="mb-4 text-muted-foreground">{description}</p>;
};

const ChallengeCardTechnologies = ({ technologies }: { technologies: string[] }) => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {technologies.map(tech => (
        <Badge key={tech} variant="outline">
          {tech}
        </Badge>
      ))}
    </div>
  );
};

const ChallengeCardFunctionalRequirements = ({ functional }: { functional: string[] }) => {
  return (
    <div>
      <h4 className="mb-2 font-semibold">Exigences fonctionnelles</h4>
      <ul className="list-inside list-disc">
        {functional.map(req => (
          <li key={req} className="text-sm">
            {req}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ChallengeCardTechnicalRequirements = ({ technical }: { technical: string[] }) => {
  return (
    <div>
      <h4 className="mb-2 font-semibold">Exigences techniques</h4>
      <ul className="list-inside list-disc">
        {technical.map(req => (
          <li key={req} className="text-sm">
            {req}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  return (
    <Card>
      <ChallengeCardHeader challenge={challenge} />
      <CardContent>
        <ChallengeCardDescription description={challenge.description} />
        <ChallengeCardTechnologies technologies={challenge.category.subCategory} />

        <div className="mb-4 grid grid-cols-2 gap-4">
          <ChallengeCardFunctionalRequirements functional={challenge.requirements.functional} />
          <ChallengeCardTechnicalRequirements technical={challenge.requirements.technical} />
        </div>
      </CardContent>

      <CardFooter>
        <Button>
          <Link href={`/challenges/${challenge.id}`}>Voir le challenge</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
