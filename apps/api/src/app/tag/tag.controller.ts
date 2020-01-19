import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { Observable } from 'rxjs';
import { TagDto } from './models/tag.dto';
import { TagEntity } from '../database/database-entities';
import Mapper from '../shared/intercepors/response-mappers';
import { MapResponseInterceptor } from '../shared/intercepors/map-response.interceptor';

@ApiTags('Tag')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseInterceptors(new MapResponseInterceptor(Mapper.tagEntityToDto))
  @ApiResponse({ type: [TagDto] })
  @Get()
  findAll(): Observable<TagEntity[]> {
    return this.tagService.findAll$();
  }
}
