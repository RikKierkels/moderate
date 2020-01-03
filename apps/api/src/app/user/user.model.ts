import { UserEntity } from '../database/database-entities';
import { User, UserWithProfile } from '@moderate/api-interfaces';

export class UserDto implements User {
  readonly id: string;

  static fromEntity(entity: UserEntity): UserDto {
    return {
      id: entity.id
    };
  }
}

export class UserWithProfileDto extends UserDto implements UserWithProfile {
  readonly name: string;
  readonly picture: string;
}
