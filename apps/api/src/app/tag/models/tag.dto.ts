import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@moderate/api-interfaces';

export class TagDto implements Tag {
  constructor(id: string, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }

  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly color: string;
}
