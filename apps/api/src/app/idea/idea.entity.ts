import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { Message } from '../message/message.entity';

@Entity()
export class Idea {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly title: string;

  @Column()
  readonly description: string;

  @Column()
  readonly difficulty: number;

  @ManyToMany(type => Tag)
  @JoinTable()
  readonly tags: Tag[];

  @OneToMany(type => Message, message => message.idea)
  readonly replies: Message[];

  @Column()
  readonly authorId: string;
}
