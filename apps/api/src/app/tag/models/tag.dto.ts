import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@moderate/api-interfaces';

export class TagDto implements Tag {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly color: string;
}
