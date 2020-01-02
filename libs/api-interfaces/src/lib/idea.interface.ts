import { Message, Tag, User } from '@moderate/api-interfaces';

export interface Idea {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly difficulty: number;
  readonly tags: Tag[];
  readonly author: User;
}

export interface IdeaWithMessages extends Idea {
  readonly replies: Message[];
}

export type IdeaCreate = Omit<Idea, 'id' | 'author'>;
export type IdeaUpdate = Omit<Idea, 'author'>;
