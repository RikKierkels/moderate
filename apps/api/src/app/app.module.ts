import { Module } from '@nestjs/common';
import { IdeasModule } from './ideas/ideas.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [IdeasModule, SharedModule, AuthModule]
})
export class AppModule {}
