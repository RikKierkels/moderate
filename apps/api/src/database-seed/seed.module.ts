import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from '../app/database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserEntity,
  IdeaEntity,
  MessageEntity,
  TagEntity
} from '../app/database/database-entities';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    DatabaseModule,
    TypeOrmModule.forFeature([IdeaEntity, TagEntity, MessageEntity, UserEntity])
  ],
  providers: [SeedService, Logger]
})
export class SeedModule {}
