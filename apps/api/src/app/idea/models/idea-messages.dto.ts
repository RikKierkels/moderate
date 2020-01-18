import { IdeaWithMessages } from '@moderate/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IdeaEntity } from '../../database/database-entities';
import { MessageDto } from '../../message/models/message.dto';
import { IdeaBaseDto } from './idea-base.dto';

export class IdeaWithMessagesDto extends IdeaBaseDto
  implements IdeaWithMessages {
  @ApiProperty()
  readonly messages: MessageDto[];

  static fromEntity(entity: IdeaEntity): IdeaWithMessagesDto {
    const ideaBase = this.fromEntityToBase(entity);
    const messages = (entity.messages || []).map(message =>
      MessageDto.fromEntity(message)
    );
    return Object.assign(new IdeaWithMessagesDto(), ideaBase, { messages });
  }
}