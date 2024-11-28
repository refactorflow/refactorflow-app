import { CreateSubmissionDTO, SubmissionResponseDTO } from '@/core/application/dtos/submission.dto';
import { BadRequestError, NotFoundError } from '@/core/application/errors/custom.error';
import { SubmissionRepository } from '@/core/application/ports/submission.repository';

export class SubmissionService {
  constructor(private readonly submissionRepository: SubmissionRepository) {}

  async createSubmission(data: CreateSubmissionDTO, userId: string): Promise<SubmissionResponseDTO> {
    try {
      const validatedData = CreateSubmissionDTO.parse(data);
      const submission = await this.submissionRepository.createSubmission({
        ...validatedData,
        userId,
        status: 'PENDING',
        votes: {
          upvotes: 0,
          downvotes: 0,
        },
      });
      return SubmissionResponseDTO.parse(submission);
    } catch (error) {
      throw new BadRequestError('Error creating submission', { error });
    }
  }

  async getUserChallengeSubmission(userId: string, challengeId: string): Promise<SubmissionResponseDTO | null> {
    try {
      const submission = await this.submissionRepository.getSubmissionsByUser(userId);
      if (!submission) {
        throw new NotFoundError('Challenge Submission');
      }

      return SubmissionResponseDTO.parse(submission.find(submission => submission.challengeId === challengeId) || null);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError('Error fetching user challenge submission', { error });
    }
  }
}
