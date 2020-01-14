import { MessageEntity, UserEntity } from '../../database/database-entities';

export const makeMessage = (id, text, author): MessageEntity => {
  const createAndUpdateDate = new Date(2020, 1, 1, 0, 0, 0, 0);

  return {
    id,
    text,
    author,
    idea: null,
    createdAt: createAndUpdateDate,
    updatedAt: createAndUpdateDate,
    isDeleted: false
  };
};

export const makeAuthor = (
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
