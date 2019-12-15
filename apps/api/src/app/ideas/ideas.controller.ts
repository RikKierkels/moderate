import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { Idea, Ideas } from '@moderate/api-interfaces';
import { FindOneParams } from '../shared/models';

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Get()
  async findAll(): Promise<Ideas> {
    return this.ideasService.findAll();
  }

  @Get('id')
  async find(@Param() params: FindOneParams): Promise<Idea> {
    return this.ideasService.find(params.id);
  }

  @Post()
  create(@Body('idea') idea: Idea): void {
    this.ideasService.create(idea);
  }

  @Put()
  update(@Body('idea') idea: Idea): void {
    this.ideasService.update(idea);
  }

  @Delete('id')
  delete(@Param() params: FindOneParams): void {
    this.ideasService.delete(params.id);
  }
}
