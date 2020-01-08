import { Module } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaEntity } from '../database/database-entities';
import { TagModule } from '../tag/tag.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TagModule, UserModule, TypeOrmModule.forFeature([IdeaEntity])],
  controllers: [IdeaController],
  providers: [IdeaService],
  exports: [IdeaService]
})
export class IdeaModule {}
