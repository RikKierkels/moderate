import { User } from '@moderate/api-interfaces';

export interface Message {
  readonly id: number;
  readonly text: string;
  readonly createdAt: string;
  readonly author: User;
}

export interface MessageCreate extends Pick<Message, 'text'> {
  readonly ideaId: number;
}

export type MessageUpdate = Pick<Message, 'id' | 'text'>;
