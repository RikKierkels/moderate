import { Message, Tag, User } from '@moderate/api-interfaces';

export interface IdeaBase {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly difficulty: number;
  readonly tags: Tag[];
  readonly author: User;
}

export interface Idea extends IdeaBase {
  readonly messageCount: number;
}

export interface IdeaWithMessages extends IdeaBase {
  readonly replies: Message[];
}

export type IdeaCreate = Omit<IdeaBase, 'id' | 'author'>;
export type IdeaUpdate = Omit<IdeaBase, 'author'>;
