import { db } from '@/config/server/db';
import { ChallengeService } from '@/core/application/services/challenge.service';
import { EmailService } from '@/core/application/services/email.service';
import { SolutionService } from '@/core/application/services/solution.service';
import { UserService } from '@/core/application/services/user.service';
import { StartChallengeUseCase } from '@/core/application/use-cases/challenge/start-challenge.use-case';
import { SubmitChallengeSolutionUseCase } from '@/core/application/use-cases/challenge/submit-challenge-solution.use-case';
import { ResendEmailAdapter } from '@/core/infrastructure/adapters/resend-email.adapter';
import { PrismaChallengeRepository } from '@/core/infrastructure/repositories/prisma-challenge.repository';
import { PrismaSolutionRepository } from '@/core/infrastructure/repositories/prisma-solution.repository';
import { PrismaUserRepository } from '@/core/infrastructure/repositories/prisma-user.repository';

class Container {
  private static instance: Container;

  private readonly challengeRepository = new PrismaChallengeRepository(db);
  private readonly userRepository = new PrismaUserRepository(db);
  private readonly solutionRepository = new PrismaSolutionRepository(db);
  private readonly emailRepository = new ResendEmailAdapter();

  private readonly challengeService = new ChallengeService(this.challengeRepository);
  private readonly userService = new UserService(this.userRepository);
  private readonly solutionService = new SolutionService(this.solutionRepository);
  private readonly emailService = new EmailService(this.emailRepository);

  private readonly startChallengeUseCase = new StartChallengeUseCase(this.emailService, this.challengeService);
  private readonly submitChallengeSolutionUseCase = new SubmitChallengeSolutionUseCase(
    this.userService,
    this.solutionService,
    this.challengeService,
    this.emailService,
  );

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

  public getUserService(): UserService {
    return this.userService;
  }

  public getEmailService(): EmailService {
    return this.emailService;
  }

  public getStartChallengeUseCase(): StartChallengeUseCase {
    return this.startChallengeUseCase;
  }

  public getSubmitChallengeSolutionUseCase(): SubmitChallengeSolutionUseCase {
    return this.submitChallengeSolutionUseCase;
  }
}

export const container = Container.getInstance();
