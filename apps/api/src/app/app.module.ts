import { Module } from '@nestjs/common';
import { IdeasModule } from './ideas/ideas.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idea } from '@moderate/api-interfaces';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => getDatabaseConfig(config),
      inject: [ConfigService]
    }),
    IdeasModule,
    AuthModule,
    SharedModule
  ]
})
export class AppModule {}

const getDatabaseConfig = (config: ConfigService) => {
  return {
    type: config.get('database.type'),
    host: config.get('database.host'),
    port: config.get('database.port'),
    username: config.get('database.username'),
    password: config.get('database.password'),
    database: config.get('database.name'),
    entities: [Idea],
    synchronize: config.get('database.synchronize')
  };
};
