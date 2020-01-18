import { User } from '@moderate/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../database/database-entities';

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

  static fromEntity(entity: UserEntity): UserDto {
    return new UserDto(entity.id, entity.username, entity.picture);
  }
}
