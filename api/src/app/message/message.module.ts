import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { UserModule } from '../user/user.module';
import { IdeaModule } from '../idea/idea.module';
import { MessageEntity } from '../database/entities/message.entity';

@Module({
  imports: [IdeaModule, UserModule, TypeOrmModule.forFeature([MessageEntity])],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
