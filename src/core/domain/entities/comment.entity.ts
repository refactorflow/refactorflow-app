export class Comment {
  constructor(
    public id: string,
    public submissionId: string,
    public userId: string,
    public content: string,
    public createdAt: Date,
    public updatedAt: Date,
    public reactions: {
      type: 'LIKE' | 'HEART' | 'HELPFUL';
      count: number;
      userIds: string[];
    }[],
    public parentCommentId?: string,
  ) {}
}
