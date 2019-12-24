import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from '../database/database-entities';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])]
})
export class TagModule {}
