export class Solution {
  constructor(
    public id: string,
    public challengeId: string,
    public userId: string,
    public title: string,
    public repositoryUrl: string,
    public description: string,
    public votes: {
      upvotes: number;
      downvotes: number;
    },
    public createdAt: Date,
    public updatedAt: Date,
    public implementationDetails?: string,
  ) {}
}
