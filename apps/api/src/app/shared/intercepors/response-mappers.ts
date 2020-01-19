import { MapFn } from './map-response.interceptor';
import {
  IdeaEntity,
  MessageEntity,
  TagEntity,
  UserEntity
} from '../../database/database-entities';
import { IdeaDto } from '../../idea/models/idea.dto';
import { IdeaWithMessagesDto } from '../../idea/models/idea-messages.dto';
import { TagDto } from '../../tag/models/tag.dto';
import { MessageDto } from '../../message/models/message.dto';
import { UserDto } from '../../user/models/user.dto';
import { TEXT_MESSAGE_DELETED } from '../constants';
import { IdeaBaseDto } from '../../idea/models/idea-base.dto';

const tagEntityToDto: MapFn<TagEntity, TagDto> = entity => ({
  id: entity.id,
  name: entity.name,
  color: entity.color
});

const userEntityToDto: MapFn<UserEntity, UserDto> = entity => ({
  id: entity.id,
  username: entity.username,
  picture: entity.picture
});

const messageEntityToDto: MapFn<MessageEntity, MessageDto> = entity => {
  const text = entity.isDeleted ? TEXT_MESSAGE_DELETED : entity.text;

  return {
    id: entity.id,
    text,
    createdAt: entity.createdAt,
    author: userEntityToDto(entity.author)
  };
};

const ideaEntityToDto: MapFn<IdeaEntity, IdeaDto> = entity => ({
  ...ideaEntityToBase(entity),
  messageCount: (entity.messages || []).length
});

const ideaEntityToDtoWithMessages: MapFn<
  IdeaEntity,
  IdeaWithMessagesDto
> = entity => ({
  ...ideaEntityToBase(entity),
  messages: (entity.messages || []).map(messageEntityToDto)
});

const ideaEntityToBase: MapFn<IdeaEntity, IdeaBaseDto> = entity => ({
  id: entity.id,
  title: entity.title,
  description: entity.description,
  difficulty: entity.difficulty,
  createdAt: entity.createdAt,
  tags: (entity.tags || []).map(tagEntityToDto),
  author: userEntityToDto(entity.author)
});

export default {
  ideaEntityToDto,
  ideaEntityToDtoWithMessages,
  tagEntityToDto,
  messageEntityToDto,
  userEntityToDto
};
