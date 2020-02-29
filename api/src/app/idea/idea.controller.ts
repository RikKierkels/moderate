import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors
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
import { MapResponseInterceptor } from '../shared/interceptors/map-response.interceptor';
import Mapper from '../shared/mappers/entity-mapper';
import { IdeaEntity } from '../database/entities/idea.entity';

@ApiTags('Idea')
@Controller('ideas')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @UseInterceptors(new MapResponseInterceptor(Mapper.mapToIdeaDto))
  @ApiResponse({ type: [IdeaDto] })
  @Get()
  findAll(): Observable<IdeaEntity[]> {
    return this.ideaService.findAll$();
  }

  @UseInterceptors(new MapResponseInterceptor(Mapper.mapToIdeaWithMessagesDto))
  @ApiResponse({ type: IdeaWithMessagesDto })
  @ApiNotFoundResponse()
  @ApiParam({ name: 'id', type: FindOneParams })
  @Get(':id')
  find(@Param() params: FindOneParams): Observable<IdeaEntity> {
    return this.ideaService.findById$(params.id);
  }

  @UseInterceptors(new MapResponseInterceptor(Mapper.mapToIdeaDto))
  @ApiResponse({ type: IdeaDto })
  @ApiNotFoundResponse()
  @Auth()
  @Post()
  create(
    @Body() ideaToCreate: IdeaCreateDto,
    @UserId() userId: string
  ): Observable<IdeaEntity> {
    return this.ideaService.create$(ideaToCreate, userId);
  }

  @UseInterceptors(new MapResponseInterceptor(Mapper.mapToIdeaDto))
  @ApiResponse({ type: IdeaDto })
  @ApiNotFoundResponse()
  @Auth(IsAuthorOfIdeaGuard)
  @Put()
  update(@Body() ideaToUpdate: IdeaUpdateDto): Observable<IdeaEntity> {
    return this.ideaService.update$(ideaToUpdate);
  }

  @ApiNotFoundResponse()
  @Auth(IsAuthorOfIdeaGuard)
  @ApiParam({ name: 'id', type: FindOneParams })
  @Delete(':id')
  delete(@Param() params: FindOneParams): void {
    this.ideaService
      .delete$(params.id)
      .pipe(first())
      .subscribe();
  }
}
