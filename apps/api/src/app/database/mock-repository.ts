import { Repository } from 'typeorm';
import 'jest';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
    findByIds: jest.fn(),
    create: jest.fn(entity => entity),
    update: jest.fn(entity => entity),
    save: jest.fn(entity => Promise.resolve(entity))
  })
);

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
