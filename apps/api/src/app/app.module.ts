import { Module } from '@nestjs/common';
import { IdeaModule } from './idea/idea.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idea } from '@moderate/api-interfaces';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => getDatabaseConfig(config),
      inject: [ConfigService]
    }),
    IdeaModule,
    AuthModule,
    SharedModule
  ]
})
export class AppModule {}

const getDatabaseConfig = (config: ConfigService) => {
  return {
    ...config.get<PostgresConnectionOptions>('database'),
    entities: [Idea]
  };
};
