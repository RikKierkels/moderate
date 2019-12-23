import { Message, Tag } from '@moderate/api-interfaces';

export class Idea {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly difficulty: number;
  readonly tags: Tag[];
  readonly replies: Message[];
  readonly authorId: string;
}

export class IdeaCreateDto {
  readonly title: string;
  readonly description: string;
  readonly difficulty: number;
  readonly tags: Tag[];
  readonly authorId: string;
}

export class IdeaUpdateDto {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly difficulty: number;
  readonly tags: Tag[];
  readonly authorId: string;
}
