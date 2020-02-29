import { IdeaDto } from '../../idea/models/idea.dto';
import { IdeaWithMessagesDto } from '../../idea/models/idea-messages.dto';
import { TagDto } from '../../tag/models/tag.dto';
import { MessageDto } from '../../message/models/message.dto';
import { UserDto } from '../../user/models/user.dto';
import { TEXT_MESSAGE_DELETED } from '../constants';
import { IdeaBaseDto } from '../../idea/models/idea-base.dto';
import { MapFunction } from '../interceptors/map-response.interceptor';
import { UserEntity } from '../../database/entities/user.entity';
import { IdeaEntity } from '../../database/entities/idea.entity';
import { TagEntity } from '../../database/entities/tag.entity';
import { MessageEntity } from '../../database/entities/message.entity';

const mapToTagDto: MapFunction<TagEntity, TagDto> = entity => {
  if (!entity) return;

  return {
    id: entity.id,
    name: entity.name,
    color: entity.color
  };
};

const mapToUserDto: MapFunction<UserEntity, UserDto> = entity => {
  if (!entity) return;

  return {
    id: entity.id,
    username: entity.username,
    picture: entity.picture
  };
};

const mapToMessageDto: MapFunction<MessageEntity, MessageDto> = entity => {
  if (!entity) return;

  const text = entity.isDeleted ? TEXT_MESSAGE_DELETED : entity.text;

  return {
    id: entity.id,
    text,
    createdAt: entity.createdAt,
    author: mapToUserDto(entity.author)
  };
};

const mapToIdeaDto: MapFunction<IdeaEntity, IdeaDto> = entity => {
  if (!entity) return;

  return {
    ...mapToIdeaBase(entity),
    messageCount: (entity.messages || []).length
  };
};

const mapToIdeaWithMessagesDto: MapFunction<
  IdeaEntity,
  IdeaWithMessagesDto
> = entity => {
  if (!entity) return;

  return {
    ...mapToIdeaBase(entity),
    messages: (entity.messages || []).map(mapToMessageDto)
  };
};

const mapToIdeaBase: MapFunction<IdeaEntity, IdeaBaseDto> = entity => {
  if (!entity) return;

  return {
    id: entity.id,
    title: entity.title,
    description: entity.description,
    difficulty: entity.difficulty,
    createdAt: entity.createdAt,
    tags: (entity.tags || []).map(mapToTagDto),
    author: mapToUserDto(entity.author)
  };
};

export default {
  mapToTagDto,
  mapToUserDto,
  mapToMessageDto,
  mapToIdeaDto,
  mapToIdeaWithMessagesDto
};
