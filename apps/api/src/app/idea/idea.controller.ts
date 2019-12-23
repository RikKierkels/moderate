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
import { Idea } from '@moderate/api-interfaces';
import { FindOneParams } from '../shared/models';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Controller('ideas')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Get()
  findAll(): Observable<Idea[]> {
    return this.ideaService.findAll();
  }

  @Get('id')
  find(@Param() params: FindOneParams): Observable<Idea> {
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
