import {
  CommentPointType,
  CompletionPointType,
  Difficulty,
  InteractionType,
  PointCategory,
  POINTS_SYSTEM,
} from '@/core/domain/constants/points.constant';

export function getPoints(category: PointCategory, type: string, subType?: string): number {
  if (category === 'COMPLETION' && subType) {
    return POINTS_SYSTEM.COMPLETION[type as CompletionPointType][subType as Difficulty];
  }

  if (category === 'INTERACTION') {
    return POINTS_SYSTEM.INTERACTION[type as CommentPointType][subType as InteractionType];
  }

  return 0;
}
