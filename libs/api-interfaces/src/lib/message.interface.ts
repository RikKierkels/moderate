import { User } from '@moderate/api-interfaces';

export interface Message {
  readonly id: number;
  readonly text: string;
  readonly createdAt: string;
  readonly author: User;
}

export type MessageCreate = Pick<Message, 'text'>;
export type MessageUpdate = Pick<Message, 'id' | 'text'>;
