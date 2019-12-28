import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

// Entities need to be located in the same file to avoid circular dependencies due to the interaction
// between NX (specifically the webpack bundler) and the ManyToOne relationships of the TypeORM.

@Entity({ name: 'idea' })
export class IdeaEntity {
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
    onDelete: 'CASCADE'
  })
  readonly replies: MessageEntity[];

  @Column()
  readonly authorId: string;
}

@Entity({ name: 'tag' })
export class TagEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;
}

@Entity({ name: 'message' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly text: string;

  @ManyToOne(type => IdeaEntity, idea => idea.replies)
  readonly idea: IdeaEntity;

  @Column()
  readonly authorId: string;
}
