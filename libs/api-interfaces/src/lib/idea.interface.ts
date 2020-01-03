import { Message, Tag, User } from '@moderate/api-interfaces';

export interface IdeaBase {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly difficulty: number;
  readonly createdAt: string;
  readonly tags: Tag[];
  readonly author: User;
}

export interface Idea extends IdeaBase {
  readonly messageCount: number;
}

export interface IdeaWithMessages extends IdeaBase {
  readonly messages: Message[];
}

export interface IdeaCreate
  extends Pick<IdeaBase, 'title' | 'description' | 'difficulty'> {
  readonly tags: number[];
}

export type IdeaUpdate = IdeaCreate & Pick<IdeaBase, 'id'>;
