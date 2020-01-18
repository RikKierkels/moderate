import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min
} from 'class-validator';
import {
  Idea,
  IdeaBase,
  IdeaCreate,
  IdeaUpdate,
  IdeaWithMessages
} from '@moderate/api-interfaces';
import { TagDto } from '../tag/tag.model';
import { MessageDto } from '../message/message.model';
import { UserDto } from '../user/user.model';
import { IdeaEntity } from '../database/database-entities';

abstract class IdeaBaseDto implements IdeaBase {
  constructor(id, title, description, difficulty, createdAt, tags, author) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.difficulty = difficulty;
    this.createdAt = createdAt;
    this.tags = tags;
    this.author = author;
  }

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

export class IdeaDto extends IdeaBaseDto implements Idea {
  constructor(id, title, description, difficulty, createdAt, tags, author) {
    super();
  }

  @ApiProperty()
  readonly messageCount: number;

  static fromEntity(entity: IdeaEntity): IdeaDto {
    const ideaBase = this.fromEntityToBase(entity);
    const messageCount = (entity.messages && entity.messages.length) || 0;
    return { ...ideaBase, messageCount };
  }
}

export class IdeaWithMessagesDto extends IdeaBaseDto
  implements IdeaWithMessages {
  @ApiProperty()
  readonly messages: MessageDto[];

  static fromEntity(entity: IdeaEntity): IdeaWithMessagesDto {
    const ideaBase = this.fromEntityToBase(entity);
    const messages = (entity.messages || []).map(message =>
      MessageDto.fromEntity(message)
    );
    return { ...ideaBase, messages };
  }
}

export class IdeaCreateDto implements IdeaCreate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  readonly difficulty: number;

  @ApiProperty()
  @ArrayNotEmpty()
  @ArrayUnique()
  readonly tags: string[];
}

export class IdeaUpdateDto extends IdeaCreateDto implements IdeaUpdate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
