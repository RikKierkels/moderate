import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Idea } from '@moderate/api-interfaces';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;

  @ManyToOne(type => Idea, idea => idea.tags)
  readonly idea: Idea;
}
