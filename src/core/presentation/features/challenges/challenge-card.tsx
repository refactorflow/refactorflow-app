import Link from 'next/link';

import { ChallengeResponseDTO } from '@/core/application/dtos/challenge.dto';
import { Badge } from '@/core/presentation/components/common/ui/badge';
import { Button } from '@/core/presentation/components/common/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/core/presentation/components/common/ui/card';

type ChallengeCardProps = {
  challenge: ChallengeResponseDTO;
};

const ChallengeCardHeader = ({
  title,
  difficulty,
  category,
  id,
}: {
  title: string;
  difficulty: string;
  category: string;
  id: string;
}) => {
  return (
    <CardHeader className="space-y-2">
      <CardTitle id={`challenge-${id}`}>{title}</CardTitle>

      <div className="flex flex-wrap gap-2">
        <Badge>{difficulty}</Badge>
        <Badge>{category}</Badge>
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

export const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  return (
    <Card>
      <ChallengeCardHeader
        title={challenge.title}
        difficulty={challenge.difficulty}
        category={challenge.categoryMain}
        id={challenge.id}
      />
      <CardContent>
        <ChallengeCardDescription description={challenge.description} />
        <ChallengeCardTechnologies technologies={challenge.subCategories} />
      </CardContent>

      <CardFooter>
        <Button>
          <Link href={`/challenges/${challenge.slug}`}>Voir le challenge</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
