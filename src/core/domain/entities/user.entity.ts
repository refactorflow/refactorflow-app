export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public createdAt: Date,
    public updatedAt: Date,
    public completedChallenges: string[],
    public submissions: string[],
    public avatar?: string | null,
    public bio?: string | null,
  ) {}
}
