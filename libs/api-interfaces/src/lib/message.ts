import { ApiProperty } from '@nestjs/swagger';

export class Message {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  readonly authorId: string;
}
