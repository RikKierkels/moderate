import { User } from '@moderate/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto implements User {
  constructor(id: string, username: string, picture: string) {
    this.id = id;
    this.username = username;
    this.picture = picture;
  }

  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly picture: string;
}
