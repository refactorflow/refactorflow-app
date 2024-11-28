import { Tag } from '@/core/domain/entities/tag.entity';

export interface TagRepository {
  createTag(tag: Omit<Tag, 'id'>): Promise<Tag>;
  getTagById(id: string): Promise<Tag | null>;
  getTagByName(name: string): Promise<Tag | null>;
  getAllTags(category?: Tag['category']): Promise<Tag[]>;
  updateTag(id: string, data: Partial<Tag>): Promise<Tag>;
  deleteTag(id: string): Promise<void>;
  addChallengeToTag(tagId: string, challengeId: string): Promise<void>;
  removeChallengeFromTag(tagId: string, challengeId: string): Promise<void>;
}
