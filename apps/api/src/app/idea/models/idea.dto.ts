import { Idea } from '@moderate/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IdeaBaseDto } from './idea-base.dto';

export class IdeaDto extends IdeaBaseDto implements Idea {
  @ApiProperty()
  readonly messageCount: number;
}
