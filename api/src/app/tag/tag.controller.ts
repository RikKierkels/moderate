import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { Observable } from 'rxjs';
import { TagDto } from './models/tag.dto';
import Mapper from '../shared/mappers/entity-mapper';
import { MapResponseInterceptor } from '../shared/interceptors/map-response.interceptor';
import { TagEntity } from '../database/entities/tag.entity';

@ApiTags('Tag')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseInterceptors(new MapResponseInterceptor(Mapper.mapToTagDto))
  @ApiResponse({ type: [TagDto] })
  @Get()
  findAll(): Observable<TagEntity[]> {
    return this.tagService.findAll$();
  }
}
