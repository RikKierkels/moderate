import { Message } from '@moderate/api-interfaces';
import { UserDto } from '../../user/models/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MessageEntity } from '../../database/database-entities';
import { TEXT_MESSAGE_DELETED } from '../../shared/constants';

export class MessageDto implements Message {
  constructor(id: string, text: string, createdAt: Date, author: UserDto) {
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
    this.author = author;
  }

  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly author: UserDto;

  static fromEntity(entity: MessageEntity): MessageDto {
    const text = entity.isDeleted ? TEXT_MESSAGE_DELETED : entity.text;

    return new MessageDto(
      entity.id,
      text,
      entity.createdAt,
      UserDto.fromEntity(entity.author)
    );
  }
}
