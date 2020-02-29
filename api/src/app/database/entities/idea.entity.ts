import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AuditableEntity } from './auditable.entity';
import { UserEntity } from './user.entity';
import { TagEntity } from './tag.entity';
import { MessageEntity } from './message.entity';

@Entity({ name: 'idea' })
export class IdeaEntity extends AuditableEntity {
  @Column({ type: 'varchar', length: 200 })
  readonly title: string;

  @Column({ type: 'text' })
  readonly description: string;

  @Column({ type: 'smallint' })
  readonly difficulty: number;

  @ManyToMany(type => TagEntity, { eager: true })
  @JoinTable()
  readonly tags: TagEntity[];

  @OneToMany(type => MessageEntity, message => message.idea, {
    eager: true,
    cascade: true
  })
  readonly messages: MessageEntity[];

  @ManyToOne(type => UserEntity, user => user.ideas, { eager: true })
  readonly author: UserEntity;
}
