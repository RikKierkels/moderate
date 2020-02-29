import { ApiProperty } from '@nestjs/swagger';
import { MessageDto } from '../../message/models/message.dto';
import { IdeaBaseDto } from './idea-base.dto';

export class IdeaWithMessagesDto extends IdeaBaseDto {
  @ApiProperty()
  readonly messages: MessageDto[];
}
