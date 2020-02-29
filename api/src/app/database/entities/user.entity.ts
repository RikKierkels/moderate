import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { MessageEntity } from './message.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  readonly id: string;

  @Column({ type: 'text' })
  readonly username: string;

  @Column({ type: 'varchar', length: 2000 })
  readonly picture: string;

  @OneToMany(type => IdeaEntity, idea => idea.author)
  readonly ideas: IdeaEntity[];

  @OneToMany(type => MessageEntity, message => message.author)
  readonly messages: MessageEntity[];
}
