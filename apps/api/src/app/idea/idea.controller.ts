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
import { Idea, IdeaCreateDto, IdeaUpdateDto } from '@moderate/api-interfaces';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdeaByIdPipe } from '../shared/idea-by-id.pipe';
import { IdeaEntity } from '../database/database-entities';

@ApiTags('Idea')
@Controller('ideas')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @ApiResponse({ type: [IdeaEntity] })
  @Get()
  findAll(): Observable<IdeaEntity[]> {
    return this.ideaService.findAll();
  }

  @ApiResponse({ type: IdeaEntity })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  find(@Param('id', IdeaByIdPipe) idea: IdeaEntity): IdeaEntity {
    return idea;
  }

  @ApiBearerAuth()
  @ApiResponse({ type: IdeaEntity })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() idea: IdeaCreateDto): Observable<IdeaEntity> {
    return this.ideaService.create(idea);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(@Body() idea: IdeaUpdateDto): void {
    this.ideaService.update(idea);
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id', IdeaByIdPipe) idea: IdeaEntity): void {
    this.ideaService.delete(idea);
  }
}
