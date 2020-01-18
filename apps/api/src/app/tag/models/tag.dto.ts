import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@moderate/api-interfaces';
import { TagEntity } from '../database/database-entities';

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

  static fromEntity(entity: TagEntity): TagDto {
    return new TagDto(entity.id, entity.name, entity.color);
  }
}
