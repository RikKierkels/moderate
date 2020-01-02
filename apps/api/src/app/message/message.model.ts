import { ApiProperty } from '@nestjs/swagger';
import { Message } from '@moderate/api-interfaces';
import { UserDto } from '../user/user.model';

export class MessageDto implements Message {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  readonly author: UserDto;
}
