import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { Observable } from 'rxjs';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdeaByIdPipe } from '../shared/pipes/idea-by-id.pipe';
import { IdeaEntity } from '../database/database-entities';
import {
  IdeaCreateDto,
  IdeaDto,
  IdeaUpdateDto,
  IdeaWithMessagesDto
} from './idea.model';
import { Auth } from '../shared/decorators/auth.decorator';

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

  @ApiResponse({ type: IdeaDto })
  @Auth()
  @Post()
  create(@Body() idea: IdeaCreateDto): Observable<IdeaDto> {
    return this.ideaService.create(idea);
  }

  @Auth()
  @Put()
  update(@Body() idea: IdeaUpdateDto): void {
    this.ideaService.update(idea);
  }

  @ApiParam({ name: 'id', type: Number })
  @Auth()
  @Delete(':id')
  delete(@Param('id', IdeaByIdPipe) idea: IdeaEntity): void {
    this.ideaService.delete(idea);
  }
}
