import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { Observable } from 'rxjs';
import { TagDto } from './tag.model';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiResponse({ type: [TagDto] })
  @Get()
  public findAll(): Observable<TagDto[]> {
    return this.tagService.findAll();
  }
}