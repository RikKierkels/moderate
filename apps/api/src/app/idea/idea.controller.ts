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
import {
  IdeaCreateDto,
  IdeaDto,
  IdeaUpdateDto,
  IdeaWithMessagesDto
} from './idea.model';
import { Auth } from '../shared/decorators/auth.decorator';
import { IsAuthorGuard } from '../shared/guards/is-author.guard';
import { UserId } from '../shared/decorators/user.decorator';
import { map } from 'rxjs/operators';

@ApiTags('Idea')
@Controller('ideas')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @ApiResponse({ type: [IdeaDto] })
  @Get()
  public findAll(): Observable<IdeaDto[]> {
    return this.ideaService
      .findAll$()
      .pipe(map(ideas => ideas.map(idea => IdeaDto.fromEntity(idea))));
  }

  @ApiResponse({ type: IdeaWithMessagesDto })
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  find(@Param('id') id: number): Observable<IdeaWithMessagesDto> {
    return this.ideaService
      .find$(id)
      .pipe(map(idea => IdeaWithMessagesDto.fromEntity(idea)));
  }

  @ApiResponse({ type: IdeaDto })
  @Auth()
  @Post()
  create(
    @Body() ideaToCreate: IdeaCreateDto,
    @UserId() userId: string
  ): Observable<IdeaDto> {
    return this.ideaService
      .create$(ideaToCreate, userId)
      .pipe(map(idea => IdeaDto.fromEntity(idea)));
  }

  @Auth(IsAuthorGuard)
  @Put()
  update(@Body() ideaToUpdate: IdeaUpdateDto): Observable<IdeaDto> {
    return this.ideaService
      .update$(ideaToUpdate)
      .pipe(map(idea => IdeaDto.fromEntity(idea)));
  }

  @ApiParam({ name: 'id', type: Number })
  @Auth(IsAuthorGuard)
  @Delete(':id')
  delete(@Param('id') id: number): void {
    this.ideaService.delete(id);
  }
}
