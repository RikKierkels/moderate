import { Module } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  IdeaEntity,
  TagEntity,
  UserEntity
} from '../database/database-entities';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity, TagEntity, UserEntity])],
  controllers: [IdeaController],
  providers: [IdeaService]
})
export class IdeaModule {}
