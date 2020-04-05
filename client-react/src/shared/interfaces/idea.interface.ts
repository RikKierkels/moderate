import { Tag } from './tag.interface';
import { User } from './user.interface';

interface IdeaBase {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly difficulty: number;
  readonly createdAt: Date;
  readonly tags: Tag[];
  readonly author: User;
}

export interface Idea extends IdeaBase {
  readonly messageCount: number;
}

export interface IdeaToCreate {
  readonly title: string;
  readonly description: string;
  readonly difficulty: number;
  readonly tags: string[];
}
