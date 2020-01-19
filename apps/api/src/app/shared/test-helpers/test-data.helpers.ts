import {
  IdeaEntity,
  MessageEntity,
  TagEntity,
  UserEntity
} from '../../database/database-entities';

const createAndUpdateDate = new Date(2020, 1, 1, 0, 0, 0, 0);

export const makeIdea = (
  id: string,
  title: string,
  description = title,
  difficulty = 1,
  author: UserEntity = null,
  messages: MessageEntity[] = [],
  tags: TagEntity[] = [],
  createdAt = createAndUpdateDate,
  updatedAt = createAndUpdateDate,
  isDeleted = false
): IdeaEntity => ({
  id,
  title,
  description,
  difficulty,
  messages,
  author,
  tags,
  createdAt,
  updatedAt,
  isDeleted
});

export const makeMessage = (
  id: string,
  text: string,
  author: UserEntity = null,
  idea: IdeaEntity = null,
  createdAt = createAndUpdateDate,
  updatedAt = createAndUpdateDate,
  isDeleted = false
): MessageEntity => ({
  id,
  text,
  author,
  idea,
  createdAt,
  updatedAt,
  isDeleted
});

export const makeUser = (
  id = 'github:123',
  username = 'Herman',
  picture = 'https://www.herman.nl/face.jpg'
): UserEntity => ({
  id,
  username,
  picture,
  ideas: [],
  messages: []
});

export const makeTag = (
  id: string,
  name: string,
  color: string
): TagEntity => ({
  id,
  name,
  color
});
