import { Module } from '@nestjs/common';
import { IdeaModule } from './idea/idea.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    DatabaseModule,
    IdeaModule,
    AuthModule,
    SharedModule,
    DatabaseModule
  ]
})
export class AppModule {}
