import { ApiProperty } from '@nestjs/swagger';
import { IdeaBaseDto } from './idea-base.dto';

export class IdeaDto extends IdeaBaseDto {
  @ApiProperty()
  readonly messageCount: number;
}
