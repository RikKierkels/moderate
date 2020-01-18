import { IdeaBase } from '@moderate/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { TagDto } from '../../tag/models/tag.dto';
import { UserDto } from '../../user/models/user.dto';
import { IdeaEntity } from '../../database/database-entities';

export class IdeaBaseDto implements IdeaBase {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly difficulty: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly tags: TagDto[];

  @ApiProperty()
  readonly author: UserDto;

  static fromEntityToBase(entity: IdeaEntity): IdeaBaseDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      difficulty: entity.difficulty,
      createdAt: entity.createdAt,
      tags: (entity.tags || []).map(tag => TagDto.fromEntity(tag)),
      author: UserDto.fromEntity(entity.author)
    };
  }
}
