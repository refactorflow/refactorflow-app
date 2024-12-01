import { Solution } from '@/core/domain/entities/solution.entity';

type CreateSolution = Partial<Solution> & {
  challengeId: string;
  userId: string;
};

export interface SolutionRepository {
  createSolution(solution: CreateSolution): Promise<Solution>;
  // getSolutionById(id: string): Promise<Solution | null>;
  // getSolutionsByChallenge(challengeId: string): Promise<Solution[]>;
  getSolutionsByUser(userId: string): Promise<Solution[]>;
  // updateSolution(id: string, data: Partial<Solution>): Promise<Solution>;
  // deleteSolution(id: string): Promise<void>;
  // updateVotes(id: string, votes: Solution['votes']): Promise<void>;
}
