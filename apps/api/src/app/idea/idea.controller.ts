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
import { Auth } from '../shared/decorators/auth.decorator';
import { UserId } from '../shared/decorators/user.decorator';
import { first } from 'rxjs/operators';
import { FindOneParams } from '../shared/find-one-params.model';
import { IsAuthorOfIdeaGuard } from '../shared/guards/is-author-of.guard';
import { IdeaCreateDto } from './models/idea-create.dto';
import { IdeaUpdateDto } from './models/idea-update.dto';
import { IdeaWithMessagesDto } from './models/idea-messages.dto';
import { IdeaDto } from './models/idea.dto';
import { IdeaEntity } from '../database/database-entities';

@ApiTags('Idea')
@Controller('ideas')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @ApiResponse({ type: [IdeaDto] })
  @Get()
  findAll(): Observable<IdeaEntity[]> {
    return this.ideaService.findAll$();
  }

  @ApiResponse({ type: IdeaWithMessagesDto })
  @ApiNotFoundResponse()
  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  find(@Param() params: FindOneParams): Observable<IdeaEntity> {
    return this.ideaService.findById$(params.id);
  }

  @ApiResponse({ type: IdeaDto })
  @Auth()
  @Post()
  create(
    @Body() ideaToCreate: IdeaCreateDto,
    @UserId() userId: string
  ): Observable<IdeaEntity> {
    return this.ideaService.create$(ideaToCreate, userId);
  }

  @ApiResponse({ type: IdeaDto })
  @ApiNotFoundResponse()
  @Auth(IsAuthorOfIdeaGuard)
  @Put()
  update(@Body() ideaToUpdate: IdeaUpdateDto): Observable<IdeaEntity> {
    return this.ideaService.update$(ideaToUpdate);
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
