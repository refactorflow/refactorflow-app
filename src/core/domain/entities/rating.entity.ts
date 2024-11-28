export class Rating {
  constructor(
    public id: string,
    public challengeId: string,
    public userId: string,
    public score: number,
    public createdAt: Date,
    public updatedAt: Date,
    public review?: string,
  ) {}
}
