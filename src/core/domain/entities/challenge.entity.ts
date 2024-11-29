export class Challenge {
  constructor(
    public id: string,
    public title: string,
    public slug: string,
    public description: string,
    public difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT',
    public category: {
      main: 'FRONTEND' | 'BACKEND' | 'FULLSTACK';
      subCategory: string[];
    },
    public starterCodeUrl: string,
    public requirements: {
      functional: string[];
      technical: string[];
    },
    public createdAt: Date,
    public updatedAt: Date,
    public authorId: string,
    public submissionCount: number,
    public averageRating: number,
    public expectedOutput?: {
      screenshots: string[];
      videoDemo?: string;
    },
  ) {}
}
