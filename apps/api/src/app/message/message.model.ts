import { ApiProperty } from '@nestjs/swagger';
import { Message, MessageCreate } from '@moderate/api-interfaces';
import { UserDto } from '../user/user.model';
import { MessageEntity } from '../database/database-entities';
import { TEXT_MESSAGE_DELETED } from '../shared/constants';

export class MessageDto implements Message {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  readonly createdAt: string;

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
  readonly text: string;
}
