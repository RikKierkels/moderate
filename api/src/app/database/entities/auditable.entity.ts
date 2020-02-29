import { BaseEntity } from './base.entity';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AuditableEntity extends BaseEntity {
  @Column({ name: 'deleted', type: 'boolean', default: false })
  readonly isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  readonly updatedAt: Date;
}
