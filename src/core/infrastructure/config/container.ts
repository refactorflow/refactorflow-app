import { db } from '@/config/server/db';
import { ChallengeService } from '@/core/application/services/challenge.service';

import { PrismaChallengeRepository } from '../repositories/prisma-challenge.repository';

class Container {
  private static instance: Container;

  private readonly challengeRepository = new PrismaChallengeRepository(db);

  private readonly challengeService = new ChallengeService(this.challengeRepository);

  private constructor() {}

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  public getChallengeService(): ChallengeService {
    return this.challengeService;
  }
}

export const container = Container.getInstance();
