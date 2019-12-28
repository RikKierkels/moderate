import { ApiProperty } from '@nestjs/swagger';
import { Tag, TagCreate } from '@moderate/api-interfaces';

export class TagDto implements Tag {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly color: string;
}

export class TagCreateDto implements TagCreate {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly color: string;
}
