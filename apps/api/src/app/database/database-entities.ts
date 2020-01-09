import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

// Entities need to be located in the same file to avoid circular dependencies due to the interaction
// between NX (specifically the webpack bundler) and the ManyToOne relationships of the TypeORM.

abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
}

abstract class AuditableEntity extends BaseEntity {
  @Column({ name: 'deleted', type: 'boolean', default: false })
  readonly isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  readonly updatedAt: Date;
}

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

@Entity({ name: 'tag' })
export class TagEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  readonly name: string;

  @Column({ type: 'varchar', length: 7 })
  readonly color: string;
}

@Entity({ name: 'message' })
export class MessageEntity extends AuditableEntity {
  @Column({ type: 'text' })
  readonly text: string;

  @ManyToOne(type => IdeaEntity, idea => idea.messages)
  readonly idea: IdeaEntity;

  @ManyToOne(type => UserEntity, user => user.ideas, { eager: true })
  readonly author: UserEntity;
}
