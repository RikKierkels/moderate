import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
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

abstract class IdeaBaseDto implements IdeaBase {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly difficulty: number;

  @ApiProperty()
  readonly tags: TagDto[];

  @ApiProperty()
  readonly author: UserDto;
}

export class IdeaDto extends IdeaBaseDto implements Idea {
  @ApiProperty()
  readonly messageCount: number;
}

export class IdeaWithMessagesDto extends IdeaBaseDto
  implements IdeaWithMessages {
  @ApiProperty()
  readonly replies: MessageDto[];
}

export class IdeaCreateDto implements IdeaCreate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
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
  @ArrayNotEmpty({ each: true })
  @ArrayUnique({ each: true })
  readonly tags: TagDto[];
}

export class IdeaUpdateDto extends IdeaCreateDto implements IdeaUpdate {
  @ApiProperty()
  @IsInt()
  readonly id: number;
}
