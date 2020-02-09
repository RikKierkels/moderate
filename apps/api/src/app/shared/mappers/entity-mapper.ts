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
import { MapFunction } from '../interceptors/map-response.interceptor';

const mapToTagDto: MapFunction<TagEntity, TagDto> = entity => ({
  id: entity.id,
  name: entity.name,
  color: entity.color
});

const mapToUserDto: MapFunction<UserEntity, UserDto> = entity => ({
  id: entity.id,
  username: entity.username,
  picture: entity.picture
});

const mapToMessageDto: MapFunction<MessageEntity, MessageDto> = entity => {
  const text = entity.isDeleted ? TEXT_MESSAGE_DELETED : entity.text;

  return {
    id: entity.id,
    text,
    createdAt: entity.createdAt,
    author: mapToUserDto(entity.author)
  };
};

const mapToIdeaDto: MapFunction<IdeaEntity, IdeaDto> = entity => ({
  ...mapToIdeaBase(entity),
  messageCount: (entity.messages || []).length
});

const mapToIdeaWithMessagesDto: MapFunction<
  IdeaEntity,
  IdeaWithMessagesDto
> = entity => ({
  ...mapToIdeaBase(entity),
  messages: (entity.messages || []).map(mapToMessageDto)
});

const mapToIdeaBase: MapFunction<IdeaEntity, IdeaBaseDto> = entity => ({
  id: entity.id,
  title: entity.title,
  description: entity.description,
  difficulty: entity.difficulty,
  createdAt: entity.createdAt,
  tags: (entity.tags || []).map(mapToTagDto),
  author: mapToUserDto(entity.author)
});

export default {
  mapToTagDto,
  mapToUserDto,
  mapToMessageDto,
  mapToIdeaDto,
  mapToIdeaWithMessagesDto
};
