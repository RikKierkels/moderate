import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@moderate/api-interfaces';
import { TagEntity } from '../database/database-entities';

export class TagDto implements Tag {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly color: string;

  static fromEntity(entity: TagEntity): TagDto {
    return {
      id: entity.id,
      name: entity.name,
      color: entity.color
    };
  }
}
