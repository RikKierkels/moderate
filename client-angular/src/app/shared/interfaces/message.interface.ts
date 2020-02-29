import { User } from './user.interface';

export interface Message {
  readonly id: string;
  readonly text: string;
  readonly createdAt: Date;
  readonly author: User;
}

export interface MessageCreate extends Pick<Message, 'text'> {
  readonly ideaId: string;
}

export type MessageUpdate = Pick<Message, 'id' | 'text'>;
