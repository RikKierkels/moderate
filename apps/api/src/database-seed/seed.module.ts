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
import { TAG_SEED_TOKEN, USER_SEED_TOKEN } from './seed.constants';
import { tagsToSeed, usersToSeed } from './seed-data';

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
      provide: USER_SEED_TOKEN,
      useValue: usersToSeed
    },
    SeedService,
    Logger
  ]
})
export class SeedModule {}
