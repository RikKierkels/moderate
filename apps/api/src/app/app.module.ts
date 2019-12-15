import { Module } from '@nestjs/common';
import { IdeasModule } from './ideas/ideas.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [IdeasModule, SharedModule]
})
export class AppModule {}
