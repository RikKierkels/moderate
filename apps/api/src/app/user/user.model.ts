import { UserEntity } from '../database/database-entities';

export class UserDto {
  readonly id: string;

  static fromEntity(entity: UserEntity): UserDto {
    return {
      id: entity.id
    };
  }
}
