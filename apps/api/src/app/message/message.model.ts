import { ApiProperty } from '@nestjs/swagger';
import { Message } from '@moderate/api-interfaces';

export class MessageDto implements Message {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  readonly authorId: string;
}
