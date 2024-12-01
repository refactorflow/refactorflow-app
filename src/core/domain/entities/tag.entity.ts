export class Tag {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly category: 'LANGUAGE' | 'FRAMEWORK' | 'TOOL' | 'CONCEPT',
    public readonly challengeIds: string[] = [],
  ) {}
}
