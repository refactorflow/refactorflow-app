import { Comment } from '@/core/domain/entities/comment.entity';

export interface CommentRepository {
  createComment(comment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Comment>;
  getCommentById(id: string): Promise<Comment | null>;
  getCommentsBySubmission(submissionId: string): Promise<Comment[]>;
  getCommentReplies(commentId: string): Promise<Comment[]>;
  updateComment(id: string, data: Partial<Comment>): Promise<Comment>;
  deleteComment(id: string): Promise<void>;
  updateReactions(id: string, reactions: Comment['reactions']): Promise<void>;
}
