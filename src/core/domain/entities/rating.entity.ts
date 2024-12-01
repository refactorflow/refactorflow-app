export class Rating {
  constructor(
    public readonly id: string,
    public readonly challengeId: string,
    public readonly userId: string,
    public readonly score: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly review: string | null,
  ) {}
}
