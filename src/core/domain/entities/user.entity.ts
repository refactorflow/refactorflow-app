export class User {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly avatar: string | null,
    public readonly bio: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly role: 'USER' | 'ADMIN' = 'USER',
    public readonly solutionIds: string[] = [],
    public readonly commentsIds: string[] = [],
    public readonly ratingsIds: string[] = [],
    public readonly completedChallengeIds: string[] = [],
    public readonly startedChallengeIds: string[] = [],
  ) {}
}
