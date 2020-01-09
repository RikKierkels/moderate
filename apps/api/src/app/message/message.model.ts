import { ApiProperty } from '@nestjs/swagger';
import {
  Message,
  MessageCreate,
  MessageUpdate
} from '@moderate/api-interfaces';
import { UserDto } from '../user/user.model';
import { MessageEntity } from '../database/database-entities';
import { TEXT_MESSAGE_DELETED } from '../shared/constants';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class MessageDto implements Message {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly author: UserDto;

  static fromEntity(entity: MessageEntity): MessageDto {
    return {
      id: entity.id,
      text: entity.isDeleted ? TEXT_MESSAGE_DELETED : entity.text,
      createdAt: entity.createdAt,
      author: UserDto.fromEntity(entity.author)
    };
  }
}

export class MessageCreateDto implements MessageCreate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly ideaId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly text: string;
}

export class MessageUpdateDto implements MessageUpdate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly text: string;
}
