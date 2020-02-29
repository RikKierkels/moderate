import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from '../app/database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SEED_CONFIG_TOKEN, TAG_SEED_TOKEN } from './seed.constants';
import { tagsToSeed } from './seed-data';
import { SeedConfig } from './seed-config.interface';
import { UserEntity } from '../app/database/entities/user.entity';
import { IdeaEntity } from '../app/database/entities/idea.entity';
import { TagEntity } from '../app/database/entities/tag.entity';
import { MessageEntity } from '../app/database/entities/message.entity';

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
