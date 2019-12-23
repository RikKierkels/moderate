import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { Idea, Ideas } from '@moderate/api-interfaces';
import { FindOneParams } from '../shared/models';
import { AuthGuard } from '@nestjs/passport';

@Controller('ideas')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Get()
  async findAll(): Promise<Ideas> {
    return this.ideaService.findAll();
  }

  @Get('id')
  async find(@Param() params: FindOneParams): Promise<Idea> {
    return this.ideaService.find(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body('idea') idea: Idea): void {
    this.ideaService.create(idea);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(@Body('idea') idea: Idea): void {
    this.ideaService.update(idea);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('id')
  delete(@Param() params: FindOneParams): void {
    this.ideaService.delete(params.id);
  }
}
