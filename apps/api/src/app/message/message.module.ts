import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from '../database/database-entities';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])]
})
export class MessageModule {}
