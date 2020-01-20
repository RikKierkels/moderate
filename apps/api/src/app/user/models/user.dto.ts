import { User } from '@moderate/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto implements User {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly picture: string;
}
