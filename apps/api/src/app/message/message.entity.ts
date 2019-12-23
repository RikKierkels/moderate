import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Idea } from '@moderate/api-interfaces';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly text: string;

  @ManyToOne(type => Idea, idea => idea.replies)
  readonly idea: Idea;

  @Column()
  readonly authorId: string;
}
