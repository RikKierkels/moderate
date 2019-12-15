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

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Get()
  async findAll(): Promise<Ideas> {
    return this.ideasService.findAll();
  }

  @Get('id')
  async find(@Param('id') id: number): Promise<Idea> {
    return this.ideasService.find(id);
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
  delete(@Param('id') id: number): void {
    this.ideasService.delete(id);
  }
}
