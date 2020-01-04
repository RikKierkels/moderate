import { UserEntity } from '../database/database-entities';
import { User } from '@moderate/api-interfaces';

export class UserDto implements User {
  readonly id: string;
  readonly username: string;
  readonly picture: string;

  static fromEntity(entity: UserEntity): UserDto {
    return {
      id: entity.id,
      username: entity.username,
      picture: entity.picture
    };
  }
}
