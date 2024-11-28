export class Tag {
  constructor(
    public id: string,
    public name: string,
    public category: 'LANGUAGE' | 'FRAMEWORK' | 'TOOL' | 'CONCEPT',
    public challengeIds: string[],
  ) {}
}
