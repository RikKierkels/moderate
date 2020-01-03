import { User } from '@moderate/api-interfaces';

export interface Message {
  readonly id: number;
  readonly text: string;
  readonly createdAt: string;
  readonly author: User;
}
