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
import {
  ApiNotFoundResponse,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import {
  IdeaCreateDto,
  IdeaDto,
  IdeaUpdateDto,
  IdeaWithMessagesDto
} from './idea.model';
import { Auth } from '../shared/decorators/auth.decorator';
import { IsAuthorOfIdeaGuard } from '../shared/guards/is-author-of-idea-guard';
import { UserId } from '../shared/decorators/user.decorator';
import { first, map } from 'rxjs/operators';
import { FindOneParams } from '../shared/find-one-params.model';

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
  @ApiNotFoundResponse()
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  find(@Param() params: FindOneParams): Observable<IdeaWithMessagesDto> {
    return this.ideaService
      .findById$(params.id)
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

  @ApiResponse({ type: IdeaDto })
  @ApiNotFoundResponse()
  @Auth(IsAuthorOfIdeaGuard)
  @Put()
  update(@Body() ideaToUpdate: IdeaUpdateDto): Observable<IdeaDto> {
    return this.ideaService
      .update$(ideaToUpdate)
      .pipe(map(idea => IdeaDto.fromEntity(idea)));
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiNotFoundResponse()
  @Auth(IsAuthorOfIdeaGuard)
  @Delete(':id')
  delete(@Param() params: FindOneParams): void {
    this.ideaService
      .delete$(params.id)
      .pipe(first())
      .subscribe();
  }
}
