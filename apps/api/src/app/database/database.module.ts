import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {
  UserEntity,
  IdeaEntity,
  MessageEntity,
  TagEntity
} from './database-entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => getDatabaseConfig(config),
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule {}

const getDatabaseConfig = (config: ConfigService) => ({
  ...config.get<PostgresConnectionOptions>('database'),
  entities: [IdeaEntity, TagEntity, MessageEntity, UserEntity]
});
