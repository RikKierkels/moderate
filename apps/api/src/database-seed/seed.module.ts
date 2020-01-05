import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from '../app/database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  IdeaEntity,
  MessageEntity,
  TagEntity,
  UserEntity
} from '../app/database/database-entities';
import { SEED_CONFIG_TOKEN, TAG_SEED_TOKEN } from './seed.constants';
import { tagsToSeed } from './seed-data';
import { SeedConfig } from './seed-config.interface';

const seedConfig: SeedConfig = {
  userCount: 6,
  ideasPerUserCount: 3,
  messagesPerIdeaCount: 5
};

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    DatabaseModule,
    TypeOrmModule.forFeature([IdeaEntity, TagEntity, MessageEntity, UserEntity])
  ],
  providers: [
    {
      provide: TAG_SEED_TOKEN,
      useValue: tagsToSeed
    },
    {
      provide: SEED_CONFIG_TOKEN,
      useValue: seedConfig
    },
    SeedService,
    Logger
  ]
})
export class SeedModule {}
