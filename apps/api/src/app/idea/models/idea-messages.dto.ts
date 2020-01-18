import { IdeaBaseDto } from './idea-base-dto.model';
import { IdeaWithMessages } from '@moderate/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IdeaEntity } from '../../database/database-entities';
import { MessageDto } from '../../message/models/message.dto';

export class IdeaWithMessagesDto extends IdeaBaseDto
  implements IdeaWithMessages {
  @ApiProperty()
  readonly messages: MessageDto[];

  static fromEntity(entity: IdeaEntity): IdeaWithMessagesDto {
    const ideaBase = this.fromEntityToBase(entity);
    const messages = (entity.messages || []).map(message =>
      MessageDto.fromEntity(message)
    );
    return { ...ideaBase, messages };
  }
}
