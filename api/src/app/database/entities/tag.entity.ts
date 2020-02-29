import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'tag' })
export class TagEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  readonly name: string;

  @Column({ type: 'varchar', length: 7 })
  readonly color: string;
}
