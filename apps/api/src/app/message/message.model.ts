import { ApiProperty } from '@nestjs/swagger';
import { Message } from '@moderate/api-interfaces';
import { UserDto } from '../user/user.model';
import { MessageEntity } from '../database/database-entities';

export class MessageDto implements Message {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  readonly author: UserDto;

  static fromEntity(entity: MessageEntity): MessageDto {
    return {
      id: entity.id,
      text: entity.text,
      author: UserDto.fromEntity(entity.author)
    };
  }
}
