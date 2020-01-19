import { Message } from '@moderate/api-interfaces';
import { UserDto } from '../../user/models/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MessageDto implements Message {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly author: UserDto;
}
