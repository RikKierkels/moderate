import { Module } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idea } from '@moderate/api-interfaces';

@Module({
  imports: [TypeOrmModule.forFeature([Idea])],
  controllers: [IdeaController],
  providers: [IdeaService]
})
export class IdeaModule {}
