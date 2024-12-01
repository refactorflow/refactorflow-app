export class User {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly avatar: string | null,
    public readonly bio: string | null,
    public readonly totalPoints: number,
    public readonly rank: number | null,
    public readonly challengePoints: number,
    public readonly interactionPoints: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly role: 'USER' | 'ADMIN' = 'USER',
    public readonly solutionIds: string[] = [],
    public readonly commentsIds: string[] = [],
    public readonly ratingsIds: string[] = [],
    public readonly pointTransactionIds: string[] = [],
    public readonly completedChallengeIds: string[] = [],
    public readonly startedChallengeIds: string[] = [],
  ) {}
}
