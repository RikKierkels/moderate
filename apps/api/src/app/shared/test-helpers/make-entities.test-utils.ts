import {
  IdeaEntity,
  MessageEntity,
  TagEntity,
  UserEntity
} from '../../database/database-entities';
import * as faker from 'faker';
import { random } from 'lodash';

export const makeIdea = (): IdeaEntity => ({
  id: faker.random.uuid(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraphs(),
  difficulty: random(1, 5),
  author: makeUser(),
  messages: null,
  tags: null,
  createdAt: new Date(faker.date.past()),
  updatedAt: new Date(faker.date.past()),
  isDeleted: false
});

export const makeMessage = (): MessageEntity => ({
  id: faker.random.uuid(),
  text: faker.lorem.paragraph(),
  author: makeUser(),
  idea: null,
  createdAt: new Date(faker.date.past()),
  updatedAt: new Date(faker.date.past()),
  isDeleted: false
});

export const makeUser = (): UserEntity => ({
  id: faker.random.uuid(),
  username: faker.internet.username(),
  picture: faker.image.avatar(),
  ideas: [],
  messages: []
});

export const makeTag = (): TagEntity => ({
  id: faker.random.uuid(),
  name: faker.lorem.word(),
  color: faker.internet.color()
});
