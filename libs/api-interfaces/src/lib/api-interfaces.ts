export class Idea {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly difficulty: number;
  readonly tags: string[];
}

export class Ideas {
  [key: number]: Idea;
}
