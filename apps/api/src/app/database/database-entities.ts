import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from 'typeorm';

// Entities need to be located in the same file to avoid circular dependencies due to the interaction
// between NX (specifically the webpack bundler) and the ManyToOne relationships of the TypeORM.

abstract class AuditableEntity {
  @Column({ default: () => 'false' })
  readonly isDeleted: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'now()'
  })
  readonly createdAt: string;
}

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn()
  readonly id: string;

  @OneToMany(type => IdeaEntity, idea => idea.author)
  readonly ideas: IdeaEntity[];

  @OneToMany(type => MessageEntity, message => message.author)
  readonly messages: MessageEntity[];
}

@Entity({ name: 'idea' })
export class IdeaEntity extends AuditableEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly title: string;

  @Column()
  readonly description: string;

  @Column()
  readonly difficulty: number;

  @ManyToMany(type => TagEntity, { eager: true })
  @JoinTable()
  readonly tags: TagEntity[];

  @OneToMany(type => MessageEntity, message => message.idea, {
    eager: true,
    onDelete: 'CASCADE'
  })
  readonly messages: MessageEntity[];

  @ManyToOne(type => UserEntity, user => user.ideas, { eager: true })
  readonly author: UserEntity;
}

@Entity({ name: 'tag' })
export class TagEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;

  @Column()
  readonly color: string;
}

@Entity({ name: 'message' })
export class MessageEntity extends AuditableEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly text: string;

  @ManyToOne(type => IdeaEntity, idea => idea.messages)
  readonly idea: IdeaEntity;

  @ManyToOne(type => UserEntity, user => user.ideas, { eager: true })
  readonly author: UserEntity;
}
