export class Submission {
  constructor(
    public id: string,
    public challengeId: string,
    public userId: string,
    public repositoryUrl: string,
    public description: string,
    public status: 'PENDING' | 'APPROVED' | 'REJECTED',
    public votes: {
      upvotes: number;
      downvotes: number;
    },
    public createdAt: Date,
    public updatedAt: Date,
    public comments: Comment[],
    public livePreviewUrl?: string,
    public implementationDetails?: string,
  ) {}
}
