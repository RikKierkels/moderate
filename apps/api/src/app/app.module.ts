import { Module } from '@nestjs/common';
import { IdeasModule } from './ideas/ideas.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), IdeasModule, AuthModule, SharedModule]
})
export class AppModule {}
