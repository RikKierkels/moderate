import { Module } from '@nestjs/common';
import { IdeasModule } from './ideas/ideas.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    IdeasModule,
    AuthModule,
    SharedModule
  ]
})
export class AppModule {}
