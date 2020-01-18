import { User } from '@moderate/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../database/database-entities';

export class UserDto implements User {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly picture: string;

  static fromEntity(entity: UserEntity): UserDto {
    return {
      id: entity.id,
      username: entity.username,
      picture: entity.picture
    };
  }
}
