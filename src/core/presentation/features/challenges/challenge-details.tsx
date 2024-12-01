import { Star } from 'lucide-react';

import { ChallengeResponseDTO } from '@/core/application/dtos/challenge.dto';
import { formatDate } from '@/core/domain/utils/format-date';
import { translateDifficulty } from '@/core/domain/utils/translate-difficulty';
import { Badge } from '@/core/presentation/components/common/ui/badge';

export const ChallengeDetails = ({ challenge }: { challenge: ChallengeResponseDTO }) => {
  const { label, stars } = translateDifficulty(challenge.difficulty);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold text-gray-800">{challenge.title}</h1>
      <h2 className="text-2xl">Votre mission</h2>
      <p>{challenge.description}</p>
      <p className="flex items-center gap-2">
        Niveau de difficulté : {label}
        <span className="flex">
          {Array.from({ length: stars }, (_, index) => (
            <Star key={index} size={20} className="fill-yellow-500 text-yellow-500" />
          ))}
        </span>
      </p>
      <p>Catégorie principale : {challenge.category.main}</p>
      <div className="flex">
        Sous-catégories :{' '}
        <div className="flex gap-1">
          {challenge.category.subCategory.map(subCategory => (
            <Badge key={subCategory}>{subCategory}</Badge>
          ))}
        </div>
      </div>
      <p>Soumissions : {challenge.submissionCount}</p>
      <p>Note moyenne : {challenge.averageRating}</p>
      <p>Date de création : {formatDate(challenge.createdAt)}</p>
    </div>
  );
};
