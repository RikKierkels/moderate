import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { Observable } from 'rxjs';
import { TagDto } from './models/tag.dto';
import { TagEntity } from '../database/database-entities';

@ApiTags('Tag')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiResponse({ type: [TagDto] })
  @Get()
  findAll(): Observable<TagEntity[]> {
    return this.tagService.findAll$();
  }
}
