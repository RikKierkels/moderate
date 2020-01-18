import { Idea } from '@moderate/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IdeaEntity } from '../../database/database-entities';
import { IdeaBaseDto } from './idea-base.dto';

export class IdeaDto extends IdeaBaseDto implements Idea {
  @ApiProperty()
  readonly messageCount: number;

  static fromEntity(entity: IdeaEntity): IdeaDto {
    const ideaBase = this.fromEntityToBase(entity);
    const messageCount = (entity.messages && entity.messages.length) || 0;
    return Object.assign(new IdeaDto(), ideaBase, { messageCount });
  }
}
