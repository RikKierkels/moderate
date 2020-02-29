import { Column, Entity, ManyToOne } from 'typeorm';
import { AuditableEntity } from './auditable.entity';
import { IdeaEntity } from './idea.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'message' })
export class MessageEntity extends AuditableEntity {
  @Column({ type: 'text' })
  readonly text: string;

  @ManyToOne(type => IdeaEntity, idea => idea.messages)
  readonly idea: IdeaEntity;

  @ManyToOne(type => UserEntity, user => user.ideas, { eager: true })
  readonly author: UserEntity;
}
