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
  ) {}
}
