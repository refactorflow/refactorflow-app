export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
export type InteractionType = 'CREATION' | 'UPVOTE_RECEIVED';

export const POINTS_SYSTEM = {
  COMPLETION: {
    CHALLENGE: {
      BEGINNER: 10,
      INTERMEDIATE: 20,
      ADVANCED: 35,
      EXPERT: 50,
    } satisfies Record<Difficulty, number>,
  },

  INTERACTION: {
    COMMENT: {
      CREATION: 5,
      UPVOTE_RECEIVED: 1,
    } satisfies Record<InteractionType, number>,
  },
} as const;

export type PointCategory = keyof typeof POINTS_SYSTEM;
export type CompletionPointType = keyof typeof POINTS_SYSTEM.COMPLETION;
export type CommentPointType = keyof typeof POINTS_SYSTEM.INTERACTION;
