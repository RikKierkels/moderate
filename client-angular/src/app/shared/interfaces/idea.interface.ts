import { Tag } from './tag.interface';
import { User } from './user.interface';
import { Message } from './message.interface';

export interface IdeaBase {
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

export interface IdeaWithMessages extends IdeaBase {
  readonly messages: Message[];
}

export interface IdeaCreate
  extends Pick<IdeaBase, 'title' | 'description' | 'difficulty'> {
  readonly tags: string[];
}

export type IdeaUpdate = IdeaCreate & Pick<IdeaBase, 'id'>;
