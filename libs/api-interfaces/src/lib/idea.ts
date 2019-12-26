import { Message, Tag } from '@moderate/api-interfaces';

export interface Idea {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly difficulty: number;
  readonly tags: Tag[];
  readonly authorId: string;
}

export interface IdeaWithMessages extends Idea {
  readonly replies: Message[];
}

export type IdeaCreate = Omit<Idea, 'id' | 'authorId'>;
export type IdeaUpdate = Omit<Idea, 'authorId'>;
