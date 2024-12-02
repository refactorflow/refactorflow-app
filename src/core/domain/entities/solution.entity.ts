export class Solution {
  constructor(
    public readonly id: string,
    public readonly challengeId: string,
    public readonly userId: string,
    public readonly title: string,
    public readonly repositoryUrl: string,
    public readonly description: string,
    public readonly upvotes: number,
    public readonly downvotes: number,
    public readonly implementationDetails: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly commentIds: string[] = [],
  ) {}

  public static create(params: {
    challengeId: string;
    userId: string;
    title: string;
    repositoryUrl: string;
    description: string;
    implementationDetails?: string;
  }) {
    return new Solution(
      crypto.randomUUID(),
      params.challengeId,
      params.userId,
      params.title,
      params.repositoryUrl,
      params.description,
      0,
      0,
      params.implementationDetails || null,
      new Date(),
      new Date(),
      [],
    );
  }
}
