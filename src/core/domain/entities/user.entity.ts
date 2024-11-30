import { Solution } from './solution.entity';

export class User {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly avatar: string | null,
    public readonly bio: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly completedChallenges: string[] = [],
    public readonly solutions: Solution[] = [],
    public readonly role: 'USER' | 'ADMIN' = 'USER',
  ) {}

  public hasCompletedChallenge(challengeId: string): boolean {
    return this.completedChallenges.includes(challengeId);
  }

  public hasSolution(challengeId: string): boolean {
    return this.solutions.some(solution => solution.challengeId === challengeId);
  }
}
