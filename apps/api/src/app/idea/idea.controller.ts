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
import {
  IdeaCreateDto,
  IdeaDto,
  IdeaUpdateDto,
  IdeaWithMessagesDto
} from '@moderate/api-interfaces';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdeaByIdPipe } from '../shared/idea-by-id.pipe';
import { IdeaEntity } from '../database/database-entities';

@ApiTags('Idea')
@Controller('ideas')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @ApiResponse({ type: [IdeaDto] })
  @Get()
  public findAll(): Observable<IdeaDto[]> {
    return this.ideaService.findAll();
  }

  @ApiResponse({ type: IdeaWithMessagesDto })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  find(@Param('id', IdeaByIdPipe) idea: IdeaEntity): IdeaWithMessagesDto {
    // TODO: Map
    return idea;
  }

  @ApiBearerAuth()
  @ApiResponse({ type: IdeaDto })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() idea: IdeaCreateDto): Observable<IdeaDto> {
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
