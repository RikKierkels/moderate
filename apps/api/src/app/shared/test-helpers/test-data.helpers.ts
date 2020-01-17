import {
  IdeaEntity,
  MessageEntity,
  UserEntity
} from '../../database/database-entities';

const createAndUpdateDate = new Date(2020, 1, 1, 0, 0, 0, 0);

export const makeIdea = (
  id,
  title,
  description = title,
  difficulty = 1,
  author = null,
  messages = [],
  tags = []
): IdeaEntity => ({
  id,
  title,
  description,
  difficulty,
  messages,
  author,
  tags,
  createdAt: createAndUpdateDate,
  updatedAt: createAndUpdateDate,
  isDeleted: false
});

export const makeMessage = (id, text, author, idea = null): MessageEntity => ({
  id,
  text,
  author,
  idea,
  createdAt: createAndUpdateDate,
  updatedAt: createAndUpdateDate,
  isDeleted: false
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
