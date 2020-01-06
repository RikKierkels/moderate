import { Module } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaEntity, MessageEntity } from '../database/database-entities';
import { TagModule } from '../tag/tag.module';
import { UserModule } from '../user/user.module';
import { MessageService } from '../message/message.service';

@Module({
  imports: [
    TagModule,
    UserModule,
    TypeOrmModule.forFeature([IdeaEntity, MessageEntity])
  ],
  controllers: [IdeaController],
  providers: [IdeaService, MessageService]
})
export class IdeaModule {}
