export class Challenge {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly slug: string,
    public readonly description: string,
    public readonly difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT',
    public readonly categoryMain: 'FRONTEND' | 'BACKEND' | 'FULLSTACK',
    public readonly subCategories: string[],
    public readonly starterCodeUrl: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly authorId: string,
    public readonly solutionCount: number,
    public readonly averageRating: number,
    public readonly solutionIds: string[] = [],
    public readonly ratingIds: string[] = [],
    public readonly tagIds: string[] = [],
  ) {}
}
